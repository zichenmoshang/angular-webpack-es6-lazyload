export default class asideCtrl{
	constructor($scope,asideService){
		$scope.navNode = asideService.getNavList();
	}
}