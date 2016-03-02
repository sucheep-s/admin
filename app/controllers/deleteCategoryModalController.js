
myApp.controller('DeleteCategoryModalController', function ($scope, $uibModalInstance, $timeout, item) {

  $scope.cat = item;
  $scope.onLoad = false;

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

});
