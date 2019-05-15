function initMap() {
    window.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 18
    });
    infoWindow = new google.maps.InfoWindow;

    // Get the current user position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // add an info window to the map on the current user location
            infoWindow.setPosition(pos);
            infoWindow.setContent('<p style="color:red">Your Position</p>');
            infoWindow.open(map);
            map.setCenter(pos);
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}
