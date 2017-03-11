export default ($stateProvider,myRegisterProvider) => {
	$stateProvider
	    .state('main.note',{
	    	abstract: true,
	    	url: '/note',
	    	templateProvider: function($q) {
	            var deferred = $q.defer();
	            require.ensure(['./tpl.html'], function(require) {
	                var template = require('./tpl.html');
	                deferred.resolve(template);
	            }, 'tpl/note-tpl');
	            return deferred.promise;
	        },
	        controller: 'noteCtrl',
	        controllerAs: 'note', //必须controllerAs来引用  this
	        resolve: {
	            'note': function($q) {
	                let deferred = $q.defer();
	                //按照依赖顺序来写
	                require.ensure([
		                	'./noteCtrl'
	                	], function() {
	                	let arr = [];
	                	//require 不能为变量
	                	arr[0] = require('./noteCtrl');
	                	myRegisterProvider.register(arr);
	                    deferred.resolve();
	                }, 'js/module/moduleNote');
	                return deferred.promise;
	            }
	        }
	    });			
}
	
