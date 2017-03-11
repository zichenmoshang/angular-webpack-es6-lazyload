var router = require('express').Router();
var formidable = require('formidable');
var myMongo   = require('../lib/myMongo');

router.post('/upNote',function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		myMongo('save',fields).done(function(data){
			res.send(data);
		},function(data){
			res.send(data);
		});
	});
});

router.post('/getNote',function(req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function(err, fields, files) {
		myMongo('getAll').done(function(data){
			res.send(data);
		},function(data){
			res.send(data);
		});
	});
});


module.exports = router;
