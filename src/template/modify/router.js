export default ($stateProvider,myRegisterProvider) => {
	$stateProvider
	    .state('main.note.modify',{
	    	url: '/modify',
	    	templateProvider: function($q) {
	            var deferred = $q.defer();
	            require.ensure(['./tpl.html'], function(require) {
	                var template = require('./tpl.html');
	                deferred.resolve(template);
	            }, 'tpl/modify-tpl');
	            return deferred.promise;
	        },
	        controller: 'modifyCtrl',
	        controllerAs: 'modify', //必须controllerAs来引用  this
	        resolve: {
	            'modify': function($q) {
	                let deferred = $q.defer();
	                //按照依赖顺序来写
	                require.ensure([
		                	'./modifyCtrl',
		                	'../../js/directive/ui-text'		                	
	                	], function() {
	                	let arr = [];
	                	//require 不能为变量
	                	arr[0] = require('./modifyCtrl');
	                	arr[1] = require('../../js/directive/ui-text');
	                	myRegisterProvider.register(arr);
	                    deferred.resolve();
	                }, 'js/module/moduleModify');
	                return deferred.promise;
	            }
	        }
	    });			
}
	
