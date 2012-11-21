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
      Map.clearOldMarkers();
    });
    channel.bind('new_donation', Map.newHitReceived);

})()



// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};