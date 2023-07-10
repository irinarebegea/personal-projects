function myMap() {
    var mapProp = {
        //Iasi lat-lng
        center: new google.maps.LatLng(47.1585, 27.6014),
        zoom: 11,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    //add marker
    var marker = new google.maps.Marker({
        position:{ lat: 47.186265207858696, lng: 27.5972276063702 },
        map:map,
        icon: 'javascript/icons/calendar.png'
        });

    //add an info window
    var infoWindow = new google.maps.InfoWindow({
        content: '<h5>Cleaning Ciric</h5>'
    });

    marker.addListener('click', function () {
        infoWindow.open(map, marker);
    });
}