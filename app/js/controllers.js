
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

	/* create a map and detect user location */
	createMap();

	$scope.change = function(){
		$http.get('php/getCardNumber.php?shopNmae',{params: {shopNmae: $scope.shopName.storeName}}).success(function(data) {
			$scope.lists = data;
		});
	}

	$scope.showMap = function(){
		var lat = getLat();
		var lng = getLng();
		console.log("~~"+lat);
		console.log("~~"+lng);
		// console.log(map);
		// removeMarkers();
		text_search($scope.shopName.storeName);
		$("#map-canvas").css("display","block");
		// 防止從隱藏回來 size 不對
		google.maps.event.trigger(map, 'resize');
		// 重新定位
		map.panTo(new google.maps.LatLng(getLat(), getLng()));
		console.log(map);
	}
}])
.controller('MyCtrl2', ["$scope", "$http", function($scope, $http) {
	$http.get('php/getAllShop.php').success(function(data) {
		$scope.lists = data;
		// $scope.shopName = $scope.shopNameLists[0];
		console.log($scope.lists);
	});

}])
.controller('MyCtrl3', ["$scope", "$http", function($scope, $http) {
	$http.get('php/getAccountInfo.php').success(function(data) {
		$scope.list = data[0];
		// $scope.shopName = $scope.shopNameLists[0];
		console.log($scope.lists);
	});

}]);


	// call back function
/*	function createMap_and_search(keyword, callback){
		var map = createMap();
		//if have callback functino then call it
		(callback && typeof(callback) === "function") && callback(keyword, map);
	}*/