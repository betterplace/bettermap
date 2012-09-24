;(function(){
    env = "production";

    Pusher.log = function(msg) {
      if(window.console && window.console.log) {
        window.console.log(msg);
      }
    };
  
    var pusher = new Pusher(APP_KEY);
    pusher.connection.bind('state_change', function(state) {
      // connected
    });
    
    var channel = pusher.subscribe('visitor-hits-'+env);
    channel.bind('pusher:subscription_succeeded', function() {
      createMap();
    });
    channel.bind('new_donation', newHitReceived);

    function newHitReceived(data) {
      var latLng = new google.maps.LatLng(data.lat, data.lng);
      
      var styleMaker = new StyledMarker({
        styleIcon: new StyledIcon(
          StyledIconTypes.BUBBLE,
          {
            color:"fff",
            text: "€" + data.amount
          }),
        position: latLng,
        map: map,
        animation: google.maps.Animation.DROP
      });

    }

    var map = null;
    function createMap() {
      var visitorLocation = new google.maps.LatLng(52,13);
      layer = "watercolor"
      var mapOptions = {
        zoom: 2,
        center: visitorLocation,
        mapTypeId: layer
      };
      
      map = new google.maps.Map(document.getElementById("map"), mapOptions);
      map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
    }
    
})()
