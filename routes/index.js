var express = require('express');
var http = require('http');
var router = express.Router();
var $ = require('cheerio');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {

  if (Object.keys(req.query).length == 0) {
    res.redirect('/?' + Math.floor(Math.random() * 10000000));
    return;
  }
  console.log(req.query);

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

module.exports = router;
