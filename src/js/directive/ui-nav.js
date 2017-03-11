let uiNavDir = () =>{
	return {
		restrict: 'A',
		link: (scope,ele,attr) => {
			var _this = angular.element(ele),
				appAside = angular.element(document.querySelector('.app-aside'));
			attr.hassecond == 'true' && ele.on('click',(e) => {
											e.stopPropagation();
											_this.toggleClass('active');
										});	
			appAside.on('mouseleave',(e) => {
				appAside[0].clientWidth == 60 && appAside.children()[1]!=undefined && appAside.children()[1].remove();
			});
			ele.on('mouseenter',(e) => {
				appAside[0].clientWidth == 60 && appAside.children()[1]!=undefined && appAside.children()[1].remove();
				if(attr.hassecond == 'true'){
					e.stopPropagation();
					if(appAside[0].clientWidth == 60){
						var top = _this[0].offsetTop + 50;
						var tmp = _this.find('ul').clone();
						tmp[0].style.top = top + 'px';
						appAside.append(tmp);
					}
				}	
			});
		}
	}
}

export default uiNavDir;