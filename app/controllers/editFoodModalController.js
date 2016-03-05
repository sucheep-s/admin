
myApp.controller('EditFoodModalController', function ($scope, $uibModalInstance, $timeout, FoodService, item) {

  $scope.food = item;
  $scope.onLoad = false;

  $scope._name = item.name;
  $scope._price = item.price;
  $scope._description = item.description;
  $scope._isShown = item.isShown;

  $scope.ok = function () {
    if($scope._name !== ''){
      if( $scope._name !== $scope.cat.name || $scope._isShown !== $scope.cat.isShown ){
        $scope.cat.name = $scope._name;
        $scope.cat.isShown = $scope._isShown;
        updateFood();
      }
    }
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  function updateFood(){
    FoodService.editFood($scope.food).success(function(data){
      $uibModalInstance.close($scope.cat);
    });
  }

});
