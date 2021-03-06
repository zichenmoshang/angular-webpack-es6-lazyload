import angular from 'angular';
import uiRouter from 'angular-ui-router';

import myRegister from '../../js/myRegister';
import router from "./router";

export default angular.module('app.note',[
		uiRouter
	])
	.config(router)
	.provider('myRegister',myRegister)
	.name;
