import 'bootstrap/dist/css/bootstrap';
import 'font-awesome/css/font-awesome';
import 'simple-line-icons/css/simple-line-icons';
import '../sass/app.scss';

import angular from 'angular';
import uiRouter from 'angular-ui-router';

import router from './router';
import moduleMain from "../template/main/app";
import moduleNote from "../template/note/app";
import moduleModify from "../template/modify/app";
import modulePreview from "../template/preview/app";
import moduleList from "../template/list/app";

import trustFilter from "./filter/trustHtml";

angular.module('app',[
		uiRouter,
		moduleMain,
		moduleNote,
		moduleModify,
		modulePreview,
		moduleList
	])
	.config(router)
	.filter('trustFilter',trustFilter);

angular.bootstrap(document,['app']);