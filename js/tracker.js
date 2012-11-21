console.log(new Date());

(function(){
    env = "staging";

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
      Map.createMap();
    });
    channel.bind('new_donation', Map.newHitReceived);

})()


