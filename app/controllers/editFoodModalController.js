/*jshint esversion: 6 */
myApp.controller('EditFoodModalController', function ($scope, $uibModalInstance, $timeout, FoodService, item) {

  $scope.deleteState = false;
  var food = {};
  $scope._name = item.name;
  $scope._price = item.price;
  $scope._description = item.description;
  $scope._isShown = item.isShown;
  $scope.onLoad = false;

  $scope.ok = function () {
    if($scope._name !== '' || $scope._price !== ''){
      updateFood();
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.delete = function(){
    deleteFood();
  };

  function updateFood(){
    food = {
      state : 'update',
      data : {
        id : item.id,
        name : $scope._name,
        description : $scope._description,
        price : $scope._price,
        isShown : $scope._isShown
      }
    };
    FoodService.editFood(food.data).success(function(data){
      if(!data.error){
        $uibModalInstance.close(food);
      }
    });
  }

  function deleteFood(){
    var delFood = {
      id : item.id
    };
    food = {
      state : 'delete',
      data : {
        id : item.id,
        name : $scope._name,
        description : $scope._description,
        price : $scope._price,
        isShown : $scope._isShown
      }
    };
    FoodService.deleteFood(delFood).success(function(data){
      if(!data.error){
        $uibModalInstance.close(food);
      }
    });
  }

});
