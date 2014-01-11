var map;
var lat_global, lng_global;
var markers = new Array();
function createMap(){
	// var myLatlng = new google.maps.LatLng(24.789071,120.9996451);
	// myLatlng = getCurrentPosition();
	var mapOptions = {
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		// center: latlng
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);	
	getCurrentPosition();
	console.log("create map");
	// return map;
}

/*獲得使用者當前位置*/
function getCurrentPosition(){
	if(navigator.geolocation) {
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			_lat=position.coords.latitude;
			_lng=position.coords.longitude;
			lat_global = position.coords.latitude;
			lng_global = position.coords.longitude;
			// 基隆
			// _lat = 25.128531;
			// _lng = 121.751905;
			var initialLocation = new google.maps.LatLng(_lat,_lng);
			console.log('getCUrrrentPosition');
			console.log("initial lat: " +_lat);
			console.log("initial lng: " +_lng);

			map.setCenter(initialLocation);
			return initialLocation;	
		}, function() {
			console.log("%s",browserSupportFlag);
			handleNoGeolocation(browserSupportFlag);
		});	
	}
	// Browser doesn't support Geolocation
	else {
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
		// return new google.maps.LatLng(24.789071,120.9996451);
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
		// if(init)
			// ajaxGetJson(map,_lat,_lng,type);
			alert("Set location to Taipei");
		}
	}

	function addMarker(map, obj,count){
		var lat = obj.geometry.location.b, lng = obj.geometry.location.d;
		var title = obj.name;

		markers[count] = new google.maps.Marker({
			position: new google.maps.LatLng(lat, lng),
			map: map,
			title: title
		});
	}

	function removeMarkers(){
		for(var i=0; i< Object.size(markers); i++)
			markers[i].setMap(null);
		markers = [];
	}

	function text_search(keyword){
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
				if(Object.size(markers)>0)
					removeMarkers();
				for (var i = 0; i < results.length; i++) {
					var place = results[i];
					console.log(results[i]);
					addMarker(map, results[i],i);
				}
			}
		}
	}

	function getLat(){
		return lat_global;
	}
	function getLng(){
		return lng_global;
	}
	/* for calculate size of object*/
	Object.size = function(obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}
		return size;
	};
