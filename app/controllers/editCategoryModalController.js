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
