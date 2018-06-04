var express = require("express");
var fs = require('fs')
var logger = require("morgan");
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var app = express();
var mongo = require('mongodb');
var assert = require('assert');
//var MongoClient = require('mongodb').MongoClient
//  , assert = require('assert');

var url = 'mongodb://localhost:27017/orwell'

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
    res.sendFile(path.join(__dirname + '/views/' + 'social.html'));
});

router.get('/get-data', function(req, res, next){
  var resultArray = []
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();
    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/insert', function(req, res, next){
  var item = {
    username: req.body.username
  }
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });
  res.redirect('/');
});

router.post('/update', function(req, res, next) {

});

router.post('/delete', function(req, res, next){

});

router.get("/eye",function(req,res){
    res.sendFile(path.join(__dirname + '/views/' + 'eye.html'));
});

router.get("*",function(req,res){
  res.sendFile(path.join(__dirname + '/views/' + '404.html'));
});

app.use("/",router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
