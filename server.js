var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
//var dburl='localhost/contactlist'
//var collections=['contactlist']
//var mongojs = require('mongojs');

var bodyParser = require('body-parser');
var util = require('util');
//var url='mongodb://localhost:27017/contactlist';
//var MongoClient = require('mongodb').MongoClient;





var numberreviews=function overallCountClass(){

}

var overallCount=new numberreviews();

// NEW STUFF ENDS


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
	console.log("I received a GET request")

	db.contactlist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});


 


app.post('/contactlist', function (req, res) {
	req.body._id=0;
	db.contactlist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});




app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({
		query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		}
	);
});



// got request and response, if want mongo us db."nameofcollection"."function", then use "err, docs"
app.get('/contactlistcount', function (req, res) {
	console.log("THIS HAS BEEN RECEIVED");
	db.contactlist.count(function(err,docs) {
 		console.log(docs);
 		res.json(docs);
	});
});


// testing stars rating
/*
app.get('/overallcount', function (req, res) {
	console.log("I received an overall get request");
	var overall5 = db.contactlist.find({overallrating:5}).count();
	var overall4 = db.contactlist.find({overallrating:4}).count();
	response = [overall4, overall5]
	res.json(response);

});
*/

// NEW STUFF 11-3-15
/*
use overallCount so easier to debug

FOR ROGER: CHANGE NAME OF DATABASE TO MATCH UP
*/
app.get('/overallCount', function (req, res){//sends this to the controller from $http.get which is the request
console.log("I received a get request for the overallacount");

db.contactlist.find({overallrating:5}).count(function(err, doc) {
  overallCount.FiveStarCount=doc;
	console.log("I received a 5 star request for the overallacount"+doc);

});

db.contactlist.find({overallrating:4}).count(function(err, doc) {
  overallCount.FourStarCount=doc;
	console.log("I received a 4 star request for the overallacount"+doc);

});
db.contactlist.find({overallrating:3}).count(function(err, doc) {
  overallCount.ThreeStarCount=doc;
  console.log("I received a 3 star request for the overallacount"+doc);
});
console.log("transition between 3 and 2");
db.contactlist.find({overallrating:2}).count(function(err, doc) {
  overallCount.TwoStarCount=doc;
	console.log("I received a 2 star request for the overallacount"+doc);

});
console.log("transition between 2 and 1");
db.contactlist.find({overallrating:1}).count(function(err, doc) {
  overallCount.OneStarCount=doc;
	res.json(overallCount);

	console.log("I received a 1 star request for the overallacount"+doc);

});
console.log("I have all my reviews ready to go");



//classes should be capitlized, functions should be capitlized, everything else is camel case
 //db.reviewlist.find({overallrating:4}).count(function(err, doc) {
 //   res.json(doc);
  //});
  //db.reviewlist.find({overallrating:3}).count(function(err, doc) {
  //   res.json(doc);
   //});
 });

 app.get('/filter/:crit1', function (req, res) {
 	console.log("I received a FILTERED request")
 	var crit1=req.params.crit1

 	console.log("did the criteria work?"+crit1)
 	db.contactlist.find({ $or: [ {professor:crit1}, {course:crit1} ] } ,function (err, docs) {

 		console.log("Filtered reviews are below"+docs);
 		res.json(docs);
 	});

 });

// NEW STUFF ENDS
//});


app.listen(3000);
console.log("server running on port 3000");
