function myMap() {
    var mapProp = {
        //Iasi lat-lng
        center: new google.maps.LatLng(47.1585, 27.6014),
        zoom: 11,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    //array of markers
    var markers = [
        //podu-ros
        {
            coords: { lat: 47.1505, lng: 27.5866 },
            iconImage: 'javascript/icons/recycle-bin.png',
            content: '<h5>Center</h5>'
        },

        //pacurari
        {
            coords: { lat: 47.1760, lng: 27.5491 },
            iconImage: 'javascript/icons/recycle-bin.png',
            content: '<h5>Bin</h5>'
        },

        //copou
        {
            coords: { lat: 47.1802, lng: 27.5685 },
            iconImage: 'javascript/icons/recycle-bin.png',
            content: '<h5>Center</h5>'
        },

        //horpaz
        {
            coords: { lat: 47.1082, lng: 27.5467 },
            iconImage: 'javascript/icons/recycle-bin.png',
            content: '<h5>Bin</h5>'
        },

        //dancu
        {
            coords: { lat: 47.1562, lng: 27.6656 },
            iconImage: 'javascript/icons/recycle-bin.png',
            content: '<h5>Center</h5>'
        }

    ];

    //loop through markers
    for (var i = 0; i < markers.length; i++) {
        //add markers
        addMarker(markers[i]);
    }

    //add marker function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            map: map
        });

        //check for customicon
        if (props.iconImage) {
            //set icon image
            marker.setIcon(props.iconImage);
        }

        //check content
        if (props.content) {
            //add an info window
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });

            marker.addListener('click', function () {
                infoWindow.open(map, marker);
            });
        }
    }
}