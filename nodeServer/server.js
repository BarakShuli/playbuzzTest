var express  = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var request = require('request');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../testProj/app')));


app.get('/getVideoFeed', function(req, res){
    request('https://cdn.playbuzz.com/content/feed/items', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body)
    }
  })
});

app.all('/*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../testProj/app/index.html'));
});

app.listen(8080);
console.log("App listening on port 8080", __dirname);
