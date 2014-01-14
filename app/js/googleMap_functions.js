var map, lat_global, lng_global, _lat, _lng;
var markers = new Array();
// var directionService = new google.maps.DirectionsService(); 
var directionService;
var directionDisplay;
// var textSearch_result = new Array();
function createMap(){
	// var myLatlng = new google.maps.LatLng(24.789071,120.9996451);
	// myLatlng = getCurrentPosition();
	var mapOptions = {
		zoom: 13,
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
			// _lat = 25.128531, _lng = 121.751905;
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

	/* 路徑規劃 */
	function direction(pFrom, pEnd){
		var oldDirections = [];
		var currentDirections = null;
		directionService = new google.maps.DirectionsService();
		directionDisplay = new google.maps.DirectionsRenderer({
			'map': map,
			'preserveViewport': true,
			'draggable': true
		});
		directionDisplay.setPanel(document.getElementById("directions_panel"));
		google.maps.event.addListener(directionDisplay, 'directions_changed',
			function() {
				if (currentDirections) {
					oldDirections.push(currentDirections);         
				}
				currentDirections = directionDisplay.getDirections();
			});
		calcRoute(directionService, directionDisplay, pFrom, pEnd);
	}

	/* 計算路徑 */
	function calcRoute(directionService, directionDisplay ,pFrom, pEnd){
		var start = pFrom;
		var end = pEnd;
		var request = {
        origin:start,       //起始地
        destination:end,    //目的地
        travelMode: google.maps.DirectionsTravelMode.DRIVING //旅行工具 WALKING | DRIVING
    };
    directionService.route(request, function(response, status) {
    	if (status == google.maps.DirectionsStatus.OK) {
    		directionDisplay.setDirections(response);
        //alert(directionDisplay.getDirections().routes[0].legs[0].start_address);//起點地點：330台灣桃園縣桃園市興華路23號
        //alert(directionDisplay.getDirections().routes[0].legs[0].end_address);       //alert(directionDisplay.getDirections().routes[0].legs[0].distance.text);//24.8公里
        //alert(directionDisplay.getDirections().routes[0].legs[0].duration.text);//31分鐘
        //alert(directionDisplay.getDirections().routes[0].copyrights);//地圖資料 2011 Kingway
        //alert(directionDisplay.getDirections().routes[0].legs[0].steps[0].instructions);//朝<b>西北</b>，走<b>興華路</b>，往<b>大智路</b>前進
        //alert(directionDisplay.getDirections().routes[0].legs[0].steps[0].distance.text);//0.3公里
    }
});

}

/* get user loaction*/
function getLat(){
	return lat_global;
}
function getLng(){
	return lng_global;
}
/* get user loaction*/

// function getTextSearchResult(){
// 	return textSearch_results;
// }
/* for calculate size of object*/
Object.size = function(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
