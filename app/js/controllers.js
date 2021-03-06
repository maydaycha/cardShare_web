
/* Controllers */

angular.module('myApp.controllers', []).
controller('MyCtrl1', ['$scope', '$http', '$window', function($scope, $http, $window) {

	$http.get('php/authentication.php', {params: {check: "check"}}).success(function(data){
		$scope.checkResults = data;
		console.log($scope.checkResults["status"]);
		if($scope.checkResults["status"]=="denied"){
			$window.location.href="./login.html";
		}
	})

	$http.get('php/getAllShop.php').success(function(data) {
		$scope.shopNameLists = data;
		$scope.shopName = $scope.shopNameLists[0];
		console.log($scope.shopName);

		$http.get('php/getCardNumber.php',{params: {shopNmae: $scope.shopName.storeName, sort: true}}).success(function(data) {
			$scope.lists = data;
		});
	});
	/* create a map and detect user location */
	createMap();

	$scope.change = function(){
		$http.get('php/getCardNumber.php',{params: {shopNmae: $scope.shopName.storeName, sort: true}}).success(function(data) {
			$scope.lists = data;
		});
	}

	$scope.displayCard = function(index, cardNo){
		$("#card"+index).css('display','block');
		$("#cardButtonTD"+index).css('display','none');
		console.log($scope.lists.length);
		for(var i =0; i < $scope.lists.length; i++){
			if(i != index){
				$("#cardButton"+i).attr("disabled", true);
			}
		}
		$http.get('php/updateUseCount.php', {params: {'cardNo': cardNo}}).success(function(data){
			console.log(data);
			console.log("update "+cardNo+" success");
			alert(cardNo);
		});
	}

	$scope.showMap = function(){
		var lat = getLat();
		var lng = getLng();
		console.log("~~"+lat);
		console.log("~~"+lng);
		$scope.text_search($scope.shopName.storeName);
		$("#map_container").css("display","block");
		// 防止從隱藏回來 size 不對
		google.maps.event.trigger(map, 'resize');
		// 重新定位
		map.panTo(new google.maps.LatLng(getLat(), getLng()));
		console.log(map);
	}
	$scope.textSearch_results = new Array();
	$scope.textSearch_results.push("initial");
	$scope.text_search = function(keyword){
		// var latlng = new google.maps.LatLng(24.789071,120.9996451);
		console.log("text_search");
		var latlng = new google.maps.LatLng(map.getCenter().lat(), map.getCenter().lng());
		var request = {
			location: latlng,
			radius: '10000',
			query: keyword
		};

		service = new google.maps.places.PlacesService(map);
		service.textSearch(request, callback);

		function callback(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				console.log(results.length);
				// $scope.textSearch_results = results;

				var latlngObject_array = new Array();
				if(Object.size(markers)>0)
					removeMarkers();
				for (var i = 0; i < results.length; i++) {
					/* if name contain keyword then add it */
					if(results[i].name.toLowerCase().indexOf(keyword) != -1){
						var place = results[i];
						console.log(results[i]);
						$scope.textSearch_results.push(results[i]);
						var obj = {"lat":results[i].geometry.location.d, "lng":results[i].geometry.location.e};
						latlngObject_array.push(obj);
						addMarker(map, results[i],i);
					}
				}
				console.log("push");
				console.log(latlngObject_array);
				var getIndex = $scope.findMiniDistStore(latlngObject_array);
				console.log(getIndex);
				console.log(results[getIndex]);
				$scope.getDirection(results[getIndex].formatted_address);	
			}
		}
	}

	/* 最短距離 */
	$scope.findMiniDistStore = function(latlngObject_array){
		var minimum_index = -1, minimum_dst = 10000, i;
		var userLat = getLat(), userLng = getLng();
		for(i = 0; i < latlngObject_array.length; i++){
			var distance = Math.sqrt(Math.pow((userLat-latlngObject_array[i].lat),2) + Math.pow((userLng-latlngObject_array[i].lng),2));
			if(distance < minimum_dst){
				minimum_dst = distance;
				minimum_index = i
			}
		}
		alert(minimum_index);
		return minimum_index;
	}
	// $scope.$watch('textSearch_results', function(){
	// 	alert("change");
	// })

$scope.getDirection = function(destAddr){
	$http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+getLat()+','+getLng()+'&sensor=true&language=zh-tw')
	.success(function(data){
		console.log("get Address");
		var userAddress = data.results[0].formatted_address;
		console.log(userAddress);
		console.log("@@ search result");
		console.log(destAddr);
		direction(userAddress, destAddr);
	})
	.error(function(){
		console.log("get address by lat lng error");
	});
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
		console.log(data);
		$scope.list = data[0];
		$scope.ownType = data[0].account;
		$scope.owner= data[0].name;
		$scope.cardPhone= data[0].mobileNum;
		// $scope.shopName = $scope.shopNameLists[0];
		// console.log($scope.lists);
	});

	$http.get('php/getUserCard.php').success(function(data){
		$scope.cardLists = data;
		console.log(data);
	});

	$scope.addCard = function(){
		// $("#cardList").css('display', 'none');
		$("#addCardTable").css('display', 'block');
	}

	$scope.save = function(){
		var dataJson = {
			'storeName': $scope.storeName,
			'cardNo': $scope.cardNo,
			'ownType': $scope.ownType,
			'owner': $scope.owner,
			'cardPhone': $scope.cardPhone,
			'expireTime': $scope.expireTime
		};
		$http({
			method: "POST",
			url: './php/addCard.php',
			data: $.param(dataJson),
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		})
		.success(function(data){
			console.log(data);
			if(data == "MySQL Query Error"){
				alert("Acconut is duplicate");
			}
			else{
				alert("add card successful");
				$("#addCardTable").css('display', 'none');
			}
		})
		.error(function(data){
			console.log("error");
		});
	}

	$scope.display_card = function(index){
		var dataJson = {
			"storeName": $scope.cardLists[index].storeName,
			"cardNo": $scope.cardLists[index].cardNo,
			"showType": 1
		};
		console.log(dataJson);
		$http.get('php/cardStatusChange.php',{params:dataJson}).success(function(data){
			console.log(data);
			window.location.reload();
		})
	}

	$scope.hide_card = function(index){
		var dataJson = {
			"storeName": $scope.cardLists[index].storeName,
			"cardNo": $scope.cardLists[index].cardNo,
			"showType": 0
		};
		console.log(dataJson);
		$http.get('php/cardStatusChange.php',{params:dataJson}).success(function(data){
			console.log(data);
			window.location.reload();
		})
	}
	

}])
.controller('signUpController', ["$scope", "$http", function($scope, $http) {

	$scope.showSignUpFrom = function(){
		$("#login_form").css('display', 'none');
		$("#signUp_form").css('display', 'block');
	}

	$scope.signUp = function(){
		var dataJson = {
			'account': $scope.account, 
			'password':$scope.password,
			'username':$scope.username,
			'sexual': $scope.sexual,
			'height': $scope.height,
			'weight': $scope.weight,
			'birthday': $scope.birthday,
			'mobilenum': $scope.mobilenum,
			'email': $scope.email,
			'address': $scope.address
		}
		console.log(dataJson);
		$http({
			method: "POST",
			url: './php/signUp.php',
			data: $.param(dataJson),
			headers: {'Content-type': 'application/x-www-form-urlencoded'}
		})
		.success(function(data){
			console.log(data);
			if(data == "MySQL Query Error"){
				alert("Acconut is duplicate");
			}
			else{
				alert("sign up success! please login ");
				$("#login_form").css('display', 'block');
				$("#signUp_form").css('display', 'none');
			}
		})
		.error(function(data){
			console.log("error");
		});
	}
}]);


	// call back function
/*	function createMap_and_search(keyword, callback){
		var map = createMap();
		//if have callback functino then call it
		(callback && typeof(callback) === "function") && callback(keyword, map);
	}*/