myApp.controller('FoodController', function($scope, $uibModal, FoodService){

  var food = {};
  $scope.isLoading = true;
  $scope.state = '';
  $scope.categories = [];
  $scope.foods = [];
  $scope.food = {};
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

  $scope.openInsertFoodModal = function () {
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
    modalInstance.result.then(function (food) {
      $scope.foods.push(food);
    });
  };

  $scope.openEditFoodModal = function (food) {
    $scope.food = food;
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'editFoodModal.html',
      controller: 'EditFoodModalController',
      size: 'lg',
      backdrop : 'static',
      resolve: {
	      item: function () {
	        return food;
	      }
	    }
    });
    modalInstance.result.then(function (data) {
      var index = $scope.foods.indexOf(food);

      if(data.state === 'update'){
        $scope.foods[index] = data.data;
      }else{
        $scope.foods.splice(index, 1);
      }
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

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

});
