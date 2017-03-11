export default ($stateProvider,myRegisterProvider) => {
	$stateProvider
	    .state('main',{
	    	abstract: true,
	    	url: '/main',
	    	templateProvider: function($q) {
	            var deferred = $q.defer();
	            require.ensure(['./tpl.html'], function(require) {
	                var template = require('./tpl.html');
	                deferred.resolve(template);
	            }, 'tpl/main-tpl');
	            return deferred.promise;
	        },
	        controller: 'mainCtrl',
	        controllerAs: 'main', //必须controllerAs来引用  this
	        resolve: {
	            'main': function($q) {
	                let deferred = $q.defer();
	                //按照依赖顺序来写
	                require.ensure([
		                	'./mainService',
		                	'../aside/asideService',
		                	'./mainCtrl',
		                	'../header/headCtrl',
		                	'../aside/asideCtrl',
		                	'../../js/directive/ui-toggleClass',
		                	'../../js/directive/ui-nav'
	                	], function() {
	                	let arr = [];
	                	//require 不能为变量
	                	arr[0] = require('./mainService');
	                	arr[1] = require('../aside/asideService');
						arr[2] = require('./mainCtrl');
						arr[3] = require('../header/headCtrl');
						arr[4] = require('../aside/asideCtrl');
						arr[5] = require('../../js/directive/ui-toggleClass');
						arr[6] = require('../../js/directive/ui-nav');
	                	myRegisterProvider.register(arr);
	                    deferred.resolve();
	                }, 'js/module/moduleMain');
	                return deferred.promise;
	            }
	        }
	    });			
}
	
