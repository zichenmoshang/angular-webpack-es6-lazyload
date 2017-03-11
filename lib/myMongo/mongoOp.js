var q = require('q');

class mongoOp{
	constructor() {
	    this.colName = 'note'
	}
	save(db,serverData){
		let deferred = q.defer();
		db.collection(this.colName).save(serverData,(err,result) => {
			if (err){
				deferred.reject('fail');
			}
	        db.close();
			deferred.resolve('success');
	   	});
	    return deferred.promise;
	}
	getAll(db){
		var deferred = q.defer();
		db.collection(this.colName).find().toArray((err, docs) => {
	      	if (err){
				deferred.reject('fail');
			}
	      	var result = JSON.stringify(docs);
	      	db.close();
			deferred.resolve(result);
	   	});
	    return deferred.promise;
	}
}

module.exports = mongoOp;