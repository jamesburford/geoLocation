//when the jQuery Mobile page is initialised
$(document).on('pageinit', function() {
	//set up listener for button click
	$(document).on('click', getPosition);
    
    var watchStatus = $('#watchStatus');
    
    //set up listener for watchStatus click
	$("#watchSwitch").change(function(status) {
        if(this.value == "on") {
            turnOnWatch();
            watchStatus.val("Watch is on");
        } else if(this.value == "off") {
            turnOffWatch();
            watchStatus.val("Watch is off");
        }
        else {
            console.log("error");
        }
    });
	
	//change time box to show message
	$('#time').val("Press the button to get location data");
	
});


//Call this function when you want to get the current position
function getPosition() {
	
	//change time box to show updated message
	$('#time').val("Getting data...");
	
	//instruct location service to get position with appropriate callbacks
	navigator.geolocation.getCurrentPosition(successPosition, failPosition);
}


//called when the position is successfully determined
function successPosition(position) {
	
	//You can find out more details about what the position obejct contains here:
	// http://www.w3schools.com/html/html5_geolocation.asp
	

	//lets get some stuff out of the position object
	var unixtime = new Date(position.timestamp);
    var time = unixtime.toDateString();
    var longitude = position.coords.longitude;
	var latitude = position.coords.latitude;

	//OK. Now we want to update the display with the correct values
	$('#time').val("Recieved data at " + time);
	$('#longtext').val(longitude);
    $('#lattext').val(latitude);
}

//called if the position is not obtained correctly
function failPosition(error) {
	//change time box to show updated message
	$('#time').val("Error getting data: " + error);
	
}

var map, currentPositionMarker, mapCenter = new google.maps.LatLng(40.700683, -73.925972);
// Watch Location
var watchID = '';
function turnOnWatch() {
    var options = {
      frequency: 3000
    };
    watchID = navigator.geolocation.watchPosition(success, error, options);
}

function success(Position) {
    console.log(Position);
    // set current position
    setCurrentPosition(Position);
    setMarkerPosition(currentPositionMarker, Position);
}
function error(error) {
    console.log(error.message);
}

function turnOffWatch() {
    navigator.geolocation.clearWatch(watchID);
}

// Google Maps Initialization



            function initializeMap()
            {
                map = new google.maps.Map(document.getElementById('map_canvas'), {
                   zoom: 13,
                   center: mapCenter,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                 });
            }

            function locError(error) {
                // the current position could not be located
                alert("The current position could not be found!");
            }

            function setCurrentPosition(Position) {
                console.log("current position: " + Position);
                currentPositionMarker = new google.maps.Marker({
                    map: map,
                    position: new google.maps.LatLng(
                        Position.coords.latitude,
                        Position.coords.longitude
                    ),
                    title: "Current Position"
                });
                map.panTo(new google.maps.LatLng(
                        Position.coords.latitude,
                        Position.coords.longitude
                    ));
            }

            function setMarkerPosition(marker, Position) {
                console.log("marker" + marker + "Position latitude" + Position.coords.latitude + "Position longitude" + Position.coords.longitude);
                marker.setPosition(
                    new google.maps.LatLng(
                        Position.coords.latitude,
                        Position.coords.longitude)
                );
            }
            
$(document).ready(function() {
                initializeMap();
            });