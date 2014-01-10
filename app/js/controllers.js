

/* Controllers */

angular.module('myApp.controllers', []).
controller('MyCtrl1', ['$scope', '$http', function($scope, $http) {
	$http.get('php/getAllShop.php').success(function(data) {
		$scope.shopNameLists = data;
		$scope.shopName = $scope.shopNameLists[0];
		console.log($scope.shopName);

		$http.get('php/getCardNumber.php?shopNmae',{params: {shopNmae: $scope.shopName.storeName}}).success(function(data) {
			$scope.lists = data;
		});
	});

	$scope.change = function(){
		$http.get('php/getCardNumber.php?shopNmae',{params: {shopNmae: $scope.shopName.storeName}}).success(function(data) {
			$scope.lists = data;
		});
	}






}])
.controller('MyCtrl2', [function() {

}]);