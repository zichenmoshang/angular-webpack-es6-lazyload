let uiButterbarDir = ($anchorScroll) => {
	return {
		restrict: 'A',
		template: '<span class="bar"></span>',
		link: (scope,ele,attr) => {
			ele.addClass('butterbar hide');
			scope.$on('$stateChangeStart',(e) => {
				$anchorScroll();
				ele.removeClass('hide').addClass('active');
			});
			scope.$on('$stateChangeSuccess',(e) => {
				e.targetScope.$watch('$viewContentLoaded',() => {
					ele.removeClass('active').addClass('hide');
				});
			});
		}
	}
}

export default uiButterbarDir;