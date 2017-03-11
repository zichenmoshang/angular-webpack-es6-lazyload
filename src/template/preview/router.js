export default ($stateProvider,myRegisterProvider) => {
	$stateProvider
	    .state('main.note.preview',{
	    	url: '/preview',
	    	templateProvider: function($q) {
	            var deferred = $q.defer();
	            require.ensure(['./tpl.html'], function(require) {
	                var template = require('./tpl.html');
	                deferred.resolve(template);
	            }, 'tpl/preview-tpl');
	            return deferred.promise;
	        },
	        controller: 'previewCtrl',
	        controllerAs: 'preview', //必须controllerAs来引用  this
	        resolve: {
	            'preview': function($q) {
	                let deferred = $q.defer();
	                //按照依赖顺序来写
	                require.ensure([
		                	'./previewCtrl'
	                	], function() {
	                	let arr = [];
	                	//require 不能为变量
	                	arr[0] = require('./previewCtrl');
	                	myRegisterProvider.register(arr);
	                    deferred.resolve();
	                }, 'js/module/modulePreview');
	                return deferred.promise;
	            }
	        }
	    });			
}
	
