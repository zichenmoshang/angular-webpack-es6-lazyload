var MongoOp = require('./mongoOp');
var q       = require('q');
var server_options={};

var MongoClient = require('mongodb').MongoClient;



let myMongo = (method,serverData) => {
	var deferred = q.defer();	
	MongoClient.connect('mongodb://localhost:27017/blog', (err, db) => {
		var mongoOp = new MongoOp();
		mongoOp[method](db,serverData).done((data) => {
			deferred.resolve(data);
		},(data) => {
			deferred.reject(data);
		});
	});
	return deferred.promise;
}


module.exports = myMongo;
