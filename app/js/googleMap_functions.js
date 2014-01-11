function getCurrentPosition(init,type){
	if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			_lat=position.coords.latitude;
			_lng=position.coords.longitude;
			// 基隆
			// _lat = 25.128531;
			// _lng = 121.751905;

			initialLocation = new google.maps.LatLng(_lat,_lng);
			map.setCenter(initialLocation);
			console.log('getCUrrrentPosition');
			console.log("initial lat: " +_lat);
			console.log("initial lng: " +_lng);
			if(init)
				ajaxGetJson(map,_lat,_lng,type);
		}, function() {
			console.log("%s",browserSupportFlag);
			handleNoGeolocation(browserSupportFlag);
		});	
	}
	// Browser doesn't support Geolocation
	else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}

	function handleNoGeolocation(errorFlag) {
		if (errorFlag == true)
			alert("地圖定位失敗");
		else 
			alert("您的瀏覽器不支援定位服務");
		// alert("set location to Taipei");
		initialLocation = taipei;
		map.setCenter(initialLocation);
		// Taipei
		_lat=25.0366641;
		_lng=121.5499766;
		if(init)
			ajaxGetJson(map,_lat,_lng,type);
		alert("Set location to Taipei");
	}
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