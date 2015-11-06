var request = require('request');
var http = require('http');
var port = process.env.PORT || 3001;

http.createServer(function(req, res) {
  request('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=krieger+archer', function(err, resp, json) {
    if (err) return console.error(err);
    var info = JSON.parse(json);
    request(info.data.image_url).pipe(res);
  });
}).listen(port);
