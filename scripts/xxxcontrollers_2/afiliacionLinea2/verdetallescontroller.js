
angular.module('GenesisApp')
 .controller('verdetallescontroller',['$scope','afiliacionHttp','notification', '$timeout',
 	function($scope,afiliacionHttp,notification,$timeout) {
 	var self=this;
  $scope.header = $scope.modalHeader;
  $scope.body = $scope.modalBody;
 }]);
