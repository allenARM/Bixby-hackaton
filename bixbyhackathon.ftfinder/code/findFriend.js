var http = require('http');
var textLib = require('textLib');
var console = require('console');

module.exports.function = function findFriend (name) {
  var response = http.getUrl('http://testwebgeobixby.000webhostapp.com/geo.json', { format: 'json' });
  var friends = response.friends;
  var markers = response.markers;
  
  for (var i = 0; i < friends.length; i++) {
    if (textLib.fuzzyMatch(friends[i].name, name, 2)) {
      var result = "outside of campus";
      for (var j = 0; j < markers.length; j++) {
        console.log(friends[i].name, markers[j].name,
          Math.abs(friends[i].latitude - markers[j].latitude),
                   Math.abs(friends[i].longitude - markers[j].longitude));
        if (Math.abs(friends[i].latitude - markers[j].latitude) <= 0.0003 &&
          Math.abs(friends[i].longitude - markers[j].longitude) <= 0.0005) {
          result = markers[j].name;
          break;
        }
      }
      console.log(friends[i].photo);
      return ({
        name: friends[i].name,
        position: (result != "outside of campus" ? "in the " + result : result),
        photo: friends[i].photo
      });
    }
  }
  return (null);
}
