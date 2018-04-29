var express = require("express");
// var path = require("path");
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
var hbs = require('hbs');

// include client-side assets and use the bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// log requests to stdout and also
// log HTTP requests to a file in combined forma

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

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
