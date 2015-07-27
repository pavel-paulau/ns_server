angular.module('mnBuckets').controller('mnBucketsDetailsDialogController',
  function ($scope, $state, mnBucketsDetailsDialogService, bucketConf, autoCompactionSettings, mnHelper, mnPromiseHelper, $modalInstance) {
    bucketConf.autoCompactionDefined = !!bucketConf.autoCompactionSettings;
    $scope.bucketConf = bucketConf;
    $scope.autoCompactionSettings = autoCompactionSettings;

    $scope.onSubmit = function () {
      var data = mnBucketsDetailsDialogService.prepareBucketConfigForSaving($scope.bucketConf, $scope.autoCompactionSettings);
      var promise = mnBucketsDetailsDialogService.postBuckets(data, $scope.bucketConf.uri);
      mnPromiseHelper($scope, promise)
        .showErrorsSensitiveSpinner()
        .catchErrors(function (result) {
          $scope.validationResult = result && mnBucketsDetailsDialogService.adaptValidationResult(result);
        })
        .onSuccess(function (result) {
          if (!result.data) {
            $modalInstance.close();
            mnHelper.reloadState();
          }
        })
        .cancelOnScopeDestroy();
    };
  });