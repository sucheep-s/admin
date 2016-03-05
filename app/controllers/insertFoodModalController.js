
myApp.controller('InsertFoodModalController', function ($scope, $uibModalInstance, item, FoodService) {

  $scope.onLoad = false;
  $scope.cat = item;
  $scope.food = {
    catId : item.id
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.ok = function(){
    addFood();
  };

  function addFood(){

    FoodService.addFood($scope.food).success(function(data){
      if(!data.error){
        $uibModalInstance.close(data);
      }

    });

  }

});
