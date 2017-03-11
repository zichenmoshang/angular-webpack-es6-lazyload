export default ($stateProvider,myRegisterProvider) => {
	$stateProvider
	    .state('main.list',{
	    	url: '/list',
	    	templateProvider: function($q) {
	            var deferred = $q.defer();
	            require.ensure(['./tpl.html'], function(require) {
	                var template = require('./tpl.html');
	                deferred.resolve(template);
	            }, 'tpl/list-tpl');
	            return deferred.promise;
	        },
	        controller: 'listCtrl',
	        controllerAs: 'list', //必须controllerAs来引用  this
	        resolve: {
	            'list': function($q) {
	                let deferred = $q.defer();
	                //按照依赖顺序来写
	                require.ensure([
		                	'./listCtrl'
	                	], function() {
	                	let arr = [];
	                	//require 不能为变量
	                	arr[0] = require('./listCtrl');
	                	myRegisterProvider.register(arr);
	                    deferred.resolve();
	                }, 'js/module/moduleList');
	                return deferred.promise;
	            }
	        }
	    });			
}
	
