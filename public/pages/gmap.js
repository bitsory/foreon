function myMap() {
    console.log("gmap.js google map my map")

    var cafefore = {lat: 33.984700531945414, lng: -84.42266277698947};
    
    mapOptions = { 
            center:new google.maps.LatLng(33.984700531945414, -84.42266277698947),
            zoom: 16,
            mapTypeControl: false,                    
            streetViewControl: false,                    
    }

    map = new google.maps.Map( 
        document.getElementById("googleMap") 
        , mapOptions);

    var marker = new google.maps.Marker({position: cafefore, map: map});

}

