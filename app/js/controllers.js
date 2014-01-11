

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

	var map;
	$scope.showMap = function(){
		var myLatlng = new google.maps.LatLng(24.789071,120.9996451);
		var mapOptions = {
			zoom: 11,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: myLatlng
		};
		map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

		var request = {
			location: myLatlng,
			radius: '50000',
			query: 'EDWIN'
		};

		service = new google.maps.places.PlacesService(map);
		service.textSearch(request, callback);

		function callback(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				console.log(results.length);
				for (var i = 0; i < results.length; i++) {
					var place = results[i];
					console.log(results[i]);
					createMarker_forSearch(map, results[i]);
				}
			}
		}

		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Hello World!'
		});
	}

	function createMarker_forSearch(map, obj){
		var lat = obj.geometry.location.b, lng = obj.geometry.location.d;
		var title = obj.name;
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map,
			title: title
		});
	}

// google.maps.event.addDomListener(window, 'load', initialize);

}])
.controller('MyCtrl2', [function() {

}]);