var myApp = angular.module('myApp', ['ui.router', 'myApp.templates', 'ngAnimate', 'ui.bootstrap']);

myApp.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){

  if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.common = {};
  }
  $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
  $httpProvider.defaults.headers.common.Pragma = "no-cache";
  $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";


  $urlRouterProvider.otherwise("/food");

  $stateProvider
  .state('food', {
  	url: "/food",
      controller: 'FoodController',
      templateUrl: 'views/food.html'
  });

}]);

myApp.factory('FoodService', function($http){
  var factory = {};

  factory.getCategory = function(accountId){
    return $http.get('api/getCategory.php');
  };

  factory.getFood = function(catId){
    return $http.get('api/getFood.php', {
        params:{ "catId": catId }
      });
  };

  factory.addCategory = function(cat){
    return $http.post('api/addCategory.php', $.param(cat),
     {
         headers:
         {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         }
     });
  };

  factory.editCategory = function(cat){
    return $http.post('api/editCategory.php', $.param(cat),
     {
         headers:
         {
             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
         }
     });
  };

  return factory;
});


myApp.controller('DeleteCategoryModalController', function ($scope, $uibModalInstance, $timeout, item) {

  $scope.cat = item;
  $scope.onLoad = false;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

myApp.controller('EditCategoryModalController', function ($scope, $uibModalInstance, $timeout, FoodService, item) {

  $scope.cat = item;
  $scope.onLoad = false;

  $scope._name = item.name;
  $scope._isShown = item.isShown;

  $scope.ok = function () {
    if($scope._name !== ''){
      if( $scope._name !== $scope.cat.name || $scope._isShown !== $scope.cat.isShown ){
        $scope.cat.name = $scope._name;
        $scope.cat.isShown = $scope._isShown;
        updateCat();
      }      
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  function updateCat(){
    FoodService.editCategory($scope.cat).success(function(data){
      $uibModalInstance.close($scope.cat);
    });
  }

});


myApp.controller('EditFoodModalController', function ($scope, $uibModalInstance, $timeout, items) {

  $scope.onLoad = false;
  $scope._email = '';
  $scope._name = '';

  $scope.emailValidation = '';
  $scope.nameValidation = '';
  $scope.errorMsg = '';
  $scope.accNameErrMsg = false;
  $scope.accEmailErrMsg = false;

  $scope.$watch('errorMsg', function(newValue, oldValue){
    if(newValue !== ''){
      $timeout(function () {
        $scope.errorMsg = '';
      }, 4000);
    }
  });

  $scope.ok = function () {
    if($scope._name === ''){

        $scope.nameValidation = 'has-error has-feedback';
        $scope.accNameErrMsg = true;

    }else if(!isValidEmail($scope._email)){

        $scope.emailValidation = 'has-error has-feedback';
        $scope.accEmailErrMsg = true;

    }else{

        $scope.onLoad =true;
        var obj = {
            name : $scope._name,
            email : $scope._email
        };
    }

  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

myApp.controller('FoodController', function($scope, $uibModal, FoodService){

  var food = {};
  $scope.isLoading = true;
  $scope.state = '';
  $scope.categories = [];
  $scope.foods = [];
  $scope.category = {};
  $scope._category = '';

  $scope.init = function(){
    getCategory();
  };

  function getCategory(){
    FoodService.getCategory().success(function(data){
      $scope.category = data[0];
      $scope.state = data[0].id.toString();
      $scope.categories = data;
      getFood();
    });
  }

  function getFood(){
    FoodService.getFood($scope.category.id).success(function(data){
      $scope.foods = data;
    }).finally(function(){
      $scope.isLoading = false;
    });
  }

  $scope.selectCategory = function(cat){
    $scope.isLoading = true;
    $scope.category = cat;
    $scope.state = cat.id.toString();
    getFood();
  };

  $scope.addCategory = function(){
    var cat = {
      cat : $scope._category
    };
    FoodService.addCategory(cat).success(function(data){
      $scope.categories.push(data);
    }).success(function(){
      $scope._category = '';
    });

  };

  $scope.animationsEnabled = true;

  $scope.openInsertModal = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'insertFoodModal.html',
      controller: 'InsertFoodModalController',
      size: 'lg',
      backdrop : 'static',
      resolve: {
        item: function () {
          return $scope.category;
        }
      }
    });
  };

  $scope.openEditModal = function () {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'editFoodModal.html',
        controller: 'EditFoodModalController',
        size: 'lg',
        backdrop : 'static',
        resolve: {
  	      items: function () {
  	        return food;
  	      }
  	    }
      });
    modalInstance.result.then(function (food) {
      $scope.accounts.push(food);
    });
  };

  $scope.openEditCatModal = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editCategoryModal.html',
      controller: 'EditCategoryModalController',
      size: 'lg',
      backdrop : 'static',
      resolve: {
	      item: function () {
	        return $scope.category;
	      }
	    }
    });

    modalInstance.result.then(function (cat) {
      var index = $scope.categories.indexOf(cat);
      $scope.categories[index] = cat;
    });
  };

  $scope.openDeleteModal = function () {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'confirmDeleteModal.html',
        controller: 'DeleteCategoryModalController',
        size: 'sm',
        backdrop : 'static',
        resolve: {
  	      item: function () {
  	        return $scope.category;
  	      }
  	    }
      });
    modalInstance.result.then(function (food) {
      $scope.accounts.push(food);
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});


myApp.controller('InsertFoodModalController', function ($scope, $uibModalInstance, item) {

  $scope.onLoad = false;
  $scope.cat = item;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});

angular.module('myApp.templates', []).run(['$templateCache', function($templateCache) {
  "use strict";
  $templateCache.put("views/category.html",
    "");
  $templateCache.put("views/food.html",
    "<div class=container ng-init=init()><div class=row><div class=col-md-3><div class=category-header><h3>Menu Category</h3></div><div class=form-add-category><div class=input-group><input class=form-control placeholder=\"Add Menu Category\" ng-model=_category> <span class=input-group-btn><button class=\"btn btn-info\" type=button ng-click=addCategory()>Add</button></span></div></div><div class=list-group><a href=# class=list-group-item ng-repeat=\"cat in categories\" ng-class=\"{active: state === cat.id}\" ng-click=selectCategory(cat)>{{cat.name}}</a></div></div><div class=col-md-9><div class=big-preload ng-show=isLoading><img src=\"assets/images/preload.gif\"></div><div class=menu-wrapper ng-show=!isLoading><div class=\"panel panel-default\"><div class=panel-heading><span class=food-header>{{category.name}}</span> <button type=button id=btn-del-cat class=\"btn btn-warning\" ng-click=openEditCatModal()>Edit Category</button></div><div class=panel-body><button type=button id=btn-add-food class=\"btn btn-info\" ng-click=openInsertModal()>Add Menu</button></div><table class=\"table table-hover\"><thead><tr><th class=food-name>Name</th><th class=food-price>Price</th><th class=food-desc>Description</th><th class=food-edit></th></tr></thead><tbody><tr ng-repeat=\"food in foods\"><td class=food-name>{{food.name}}</td><td class=food-price>{{food.price}}</td><td class=food-desc>{{food.description}}</td><td class=food-edit><a ng-click=openEditModal(food)><i class=\"fa fa-pencil-square-o\"></i></a></td></tr></tbody></table></div></div></div></div></div><script type=text/ng-template id=insertFoodModal.html><div class=\"modal-header\">\n" +
    "        <h4>Add Menu - <span style=\"text-decoration:underline;\">{{cat.name}}</span><span class=\"close\"  ng-click=\"cancel()\">X</span></h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "      <form>\n" +
    "\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"form-group col-md-8\">\n" +
    "              <div class=\"input-group {{nameValidation}}\">\n" +
    "              <span id=\"addon-name\" class=\"input-group-addon\"><i class=\"fa fa-newspaper-o\"></i></span>\n" +
    "              <input type=\"text\" class=\"form-control input-block\" id=\"accname\" placeholder=\"Menu Name *\"  ng-model=\"_name\" ng-change=\"onChangeValidate('name')\">\n" +
    "              </div>\n" +
    "              <span ng-show=\"accNameErrMsg\" for=\"accName\" generated=\"true\" class=\"help-block\">Enter your account name.</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group col-md-4\">\n" +
    "              <div class=\"input-group {{emailValidation}}\">\n" +
    "              <span class=\"input-group-addon\"><i class=\"fa fa-dollar\"></i></span>\n" +
    "              <input type=\"email\" class=\"form-control\" id=\"accemail\" placeholder=\"Price *\" ng-model=\"_email\" ng-change=\"onChangeValidate('email')\">\n" +
    "              </div>\n" +
    "              <span ng-show=\"accEmailErrMsg\" for=\"accEmail\" generated=\"true\" class=\"help-block\">Enter your email.</span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"form-group\">\n" +
    "            <div class=\"input-group {{emailValidation}}\">\n" +
    "            <span class=\"input-group-addon\"><i class=\"fa fa-info-circle\"></i></span>\n" +
    "            <input type=\"email\" class=\"form-control\" id=\"accemail\" placeholder=\"Description *\" ng-model=\"_email\" ng-change=\"onChangeValidate('email')\">\n" +
    "            </div>\n" +
    "            <span ng-show=\"accEmailErrMsg\" for=\"accEmail\" generated=\"true\" class=\"help-block\">Enter your email.</span>\n" +
    "          </div>\n" +
    "\n" +
    "      </form>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\" >\n" +
    "        <button class=\"btn btn-info\" type=\"button\" ng-click=\"ok()\" ng-show=\"!onLoad\">Save</button>\n" +
    "    </div></script><script type=text/ng-template id=editFoodModal.html><div class=\"modal-header\">\n" +
    "        <h4>Edit Menu <span class=\"close\"  ng-click=\"cancel()\">X</span></h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "      <form>\n" +
    "\n" +
    "          <div class=\"row\">\n" +
    "            <div class=\"form-group col-md-8\">\n" +
    "              <div class=\"input-group {{nameValidation}}\">\n" +
    "              <span id=\"addon-name\" class=\"input-group-addon\"><i class=\"fa fa-newspaper-o\"></i></span>\n" +
    "              <input type=\"text\" class=\"form-control input-block\" id=\"accname\" placeholder=\"Menu Name *\"  ng-model=\"_name\" ng-change=\"onChangeValidate('name')\">\n" +
    "              </div>\n" +
    "              <span ng-show=\"accNameErrMsg\" for=\"accName\" generated=\"true\" class=\"help-block\">Enter your account name.</span>\n" +
    "            </div>\n" +
    "            <div class=\"form-group col-md-4\">\n" +
    "              <div class=\"input-group {{emailValidation}}\">\n" +
    "              <span class=\"input-group-addon\"><i class=\"fa fa-dollar\"></i></span>\n" +
    "              <input type=\"email\" class=\"form-control\" id=\"accemail\" placeholder=\"Price *\" ng-model=\"_email\" ng-change=\"onChangeValidate('email')\">\n" +
    "              </div>\n" +
    "              <span ng-show=\"accEmailErrMsg\" for=\"accEmail\" generated=\"true\" class=\"help-block\">Enter your email.</span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"form-group\">\n" +
    "            <div class=\"input-group {{emailValidation}}\">\n" +
    "            <span class=\"input-group-addon\"><i class=\"fa fa-info-circle\"></i></span>\n" +
    "            <input type=\"email\" class=\"form-control\" id=\"accemail\" placeholder=\"Description *\" ng-model=\"_email\" ng-change=\"onChangeValidate('email')\">\n" +
    "            </div>\n" +
    "            <span ng-show=\"accEmailErrMsg\" for=\"accEmail\" generated=\"true\" class=\"help-block\">Enter your email.</span>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"food-edit-bottom\">\n" +
    "\n" +
    "              <label class=\"radio-inline\">\n" +
    "                <input type=\"radio\" name=\"inlineRadioOptions\" value=\"option1\"> Show in Website\n" +
    "              </label>\n" +
    "              <label class=\"radio-inline\">\n" +
    "                <input type=\"radio\" name=\"inlineRadioOptions\" value=\"option2\"> Hide in Website\n" +
    "              </label>\n" +
    "\n" +
    "              <button type=\"button\" id=\"btn-del-menu\" class=\"btn btn-danger\">Delete Menu</button>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "      </form>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\" >\n" +
    "        <button class=\"btn btn-info\" type=\"button\" ng-click=\"ok()\" ng-show=\"!onLoad\">Save</button>\n" +
    "    </div></script><script type=text/ng-template id=editCategoryModal.html><div class=\"modal-header\">\n" +
    "        <h4>Edit Category - {{cat.name}}<span class=\"close\"  ng-click=\"cancel()\">X</span></h4>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "      <form>\n" +
    "          <div class=\"form-group\">\n" +
    "            <div class=\"input-group {{emailValidation}}\">\n" +
    "            <span class=\"input-group-addon\"><i class=\"fa fa-newspaper-o\"></i></span>\n" +
    "            <input type=\"text\" class=\"form-control\" id=\"accemail\" placeholder=\"Category Name *\" ng-model=\"_name\" ng-change=\"onChangeValidate('email')\">\n" +
    "            </div>\n" +
    "            <span ng-show=\"accEmailErrMsg\" for=\"accEmail\" generated=\"true\" class=\"help-block\">Enter your email.</span>\n" +
    "          </div>\n" +
    "\n" +
    "          <div class=\"food-edit-bottom\">\n" +
    "\n" +
    "              <label class=\"radio-inline\">\n" +
    "                <input type=\"radio\" ng-model=\"_isShown\" value=\"1\"> Show in Website\n" +
    "              </label>\n" +
    "              <label class=\"radio-inline\">\n" +
    "                <input type=\"radio\" ng-model=\"_isShown\" value=\"0\"> Hide in Website\n" +
    "              </label>\n" +
    "\n" +
    "          </div>\n" +
    "\n" +
    "      </form>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\" >\n" +
    "        <button class=\"btn btn-info\" type=\"button\" ng-click=\"ok()\" ng-show=\"!onLoad\">Save</button>\n" +
    "    </div></script>");
}]);
