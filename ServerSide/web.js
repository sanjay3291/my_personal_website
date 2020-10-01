var express = require('express');
var cheerio = require('cheerio');
var request = require('request');
var cors = require('cors')

var app = express();

var colObj = [];

app.use(cors())

app.get('/', function (req, res) {
  // allow access from other domains
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  // use Cheerio to make request
  request({
    method: 'GET',
    url: 'https://www.espncricinfo.com/table/series/8048/season/2020/indian-premier-league'
    }, function(err, response, body, callback) {
      if (err) return console.error(err);
      
      // get the HTML body from url
      $ = cheerio.load(body);
      colObj = [];
      for(var i=0; i<8; i++){
        var rowObj = new Object();
        let table = $('#main-container > div > div.series-standings-page-wrapper > div > div:nth-child(2) > div > div > div > table > tbody', body);
        rowObj.rank = table[0].children[i].children[0].children[0].children[0].children[0].data;
        rowObj.teamImage = table[0].children[i].children[0].children[0].children[1].children[0].children[0].children[0].children[0].attribs.src;
        rowObj.teamName = table[0].children[i].children[0].children[0].children[1].children[0].children[1].children[0].children[0].data;
        rowObj.M = table[0].children[i].children[1].children[0].data;
        rowObj.W = table[0].children[i].children[2].children[0].data;
        rowObj.L = table[0].children[i].children[3].children[0].data;
        rowObj.NR = table[0].children[i].children[4].children[0].data;
        rowObj.PT = table[0].children[i].children[5].children[0].data;
        rowObj.NRR = table[0].children[i].children[6].children[0].data;
        colObj.push(rowObj);
    }
    //console.log(colObj);
    //return colObj;

  });
  
  // return a JSON object as a response
  res.send(colObj);
});

// start app on localhost port 3000
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('listening on port ' + port);
});