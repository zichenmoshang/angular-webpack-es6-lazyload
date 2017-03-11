export default ($urlRouterProvider,$locationProvider,$stateProvider,myRegisterProvider) => {
//	$locationProvider.
//		html5Mode(true);
	$urlRouterProvider
		.otherwise('/main/note/modify');
}
	
