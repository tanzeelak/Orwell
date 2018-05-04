var express = require("express");
var fs = require('fs')
var logger = require("morgan");
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var app = express();

// include client-side assets and use the bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log requests to stdout and also
// log HTTP requests to a file in combined format
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));

app.use(express.static(__dirname));

app.set('port', (process.env.PORT || 5000));

router.get("/",function(req,res){
    res.sendFile(path.join(__dirname + '/views/' + 'index.html'));
});

router.get("/social",function(req,res){
    res.sendFile(path.join(__dirname + '/views/' + 'social.html'));
});


router.get("*",function(req,res){
  res.sendFile(path.join(__dirname + '/views/' + '404.html'));
});

app.use("/",router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
