var express = require('express');
var router = express.Router();
var $ = require('cheerio');
var request = require('request');
var http = require('http');
var port = process.env.PORT || 3001;

var app = express();
app.set('port', port);
var server = http.createServer(app).listen(port);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/* GET home page. */
router.get('/', function(req, res, next) {

  function gotHTML(err, resp, html) {
    if (err) return console.error(err);
    var parsedHTML = $.load(html);
    // get all img tags and loop over them
    var imageURLs = [];
    parsedHTML('img').map(function(i, link) {
      var href = $(link).attr('src');
      console.log(href);
      if (!href.match('.gif')) return;
      imageURLs.push(href);
    });
    request(imageURLs[0]).pipe(res);
  };

  var domain = 'http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=krieger+archer&fmt=html';
  request(domain, gotHTML);
});

app.use('/', router);

module.exports = app;
