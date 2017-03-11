let uiToggleClassDir = () =>{
	return {
		restrict : 'A',
		link : (scope,ele,attr) =>{
			ele.on('click',(e) =>{
				e.preventDefault();
				var _class = attr.uiToggleClassDir.split(','),
					_target = attr.targetEle.split(','),
					i = 0;
				_class.forEach(()=>{
					if(/^#/.test(_target[i])){
						var tmp = document.getElementById(_target[i].replace(/^#/,''));
					}else{
						var tmp = document.querySelector(_target[i]);
					}
					angular.element(tmp).toggleClass(_class[i]);
					i++;
				})
			});
		}
	}
}

export default uiToggleClassDir;
