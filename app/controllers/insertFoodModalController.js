
myApp.controller('InsertFoodModalController', function ($scope, $uibModalInstance, item) {

  $scope.onLoad = false;
  $scope.cat = item;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
