var express = require("express");
var fs = require('fs')
var logger = require("morgan");
var bodyParser = require('body-parser');
var path = require('path');
var router = express.Router();
var app = express();
var mongo = require('mongodb');
// var mongoose = require('mongoose');
var assert = require('assert');
var hbs = require('hbs');

var url = 'mongodb://tester:tester1@ds016718.mlab.com:16718/orwell';

// mongoose.connect('mongodb://localhost:27017/orwell'); //dbName is the database name from which you need to import the questions
// module.exports = mongoose.model('User', {
//   username: String
// })
// include client-side assets and use the bodyParser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// log requests to stdout and also
// log HTTP requests to a file in combined format
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {
  flags: 'a'
});
app.use(logger('dev'));
app.use(logger('combined', {
  stream: accessLogStream
}));

app.use(express.static(__dirname));

app.set('port', (process.env.PORT || 5000));

app.set('view engine', 'hbs');


router.get("/", function (req, res) {
  var resultArray = []
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    var cursor = db.collection('user-data').find();

    cursor.forEach(function(doc, err) {
      assert.equal(null, err);
      resultArray.push(doc);
    }, function() {
      db.close();
      console.log(resultArray);
      res.render('social', {items: resultArray});
    });
  });
});

router.post('/insert', function (req, res, next) {
  var item = {
    username: req.body.username
  }
  mongo.connect(url, function (err, db) {
    assert.equal(null, err);
    db.collection('user-data').insertOne(item, function (err, result) {
      assert.equal(null, err);
      console.log(item);
      console.log('Item inserted');
      db.close();
    });
  });
});

router.post('/update', function (req, res, next) {

});

router.post('/delete', function (req, res, next) {
  mongo.connect(url, function (err, db) {
    db.collection('user-data').remove({});
  });
});

router.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + '/views/' + '404.html'));
});

app.use("/", router);

app.use(express.static("public"));

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});