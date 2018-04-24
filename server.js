var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var fs = require('fs');
var logger = require("morgan");
var hbs = require('hbs');
//https://github.com/ucladevx/Mappening-Frontend/blob/29b2b9dde13c44a87a89d2f9ce78d0f07dcca2c4/server.js
// include client-side assets and use the bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log requests to stdout and also
// log HTTP requests to a file in combined format
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'hbs');

router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

router.get("/",function(req,res){
    res.render('index');
});

app.use("/",router);

app.use(express.static("public"));

app.use("*",function(req,res){
    res.render('404');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});