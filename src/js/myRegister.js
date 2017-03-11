export default class myRegister {
  	constructor($controllerProvider,$compileProvider,$filterProvider,$provide) {
	  	this.ctrlRegister = $controllerProvider.register;
	  	this.dirRegister = $compileProvider.directive;
	  	this.filterRegister = $filterProvider.register;
	  	this.serviceRegister = $provide.service;
	  	this.factoryRegister = $provide.factory
	  	this.$get = () => {
	  		return {
	  			
	  		}
	  	}
	}
  	_analysis(func){
  		if(func.name.indexOf('Ctrl') !== -1){
			this.ctrlRegister(func.name,func);
		}else if(func.name.indexOf('Service') !== -1){
			this.serviceRegister(func.name,func);
		}else if(func.name.indexOf('Dir') !== -1){
			this.dirRegister(func.name,func);
		}else if(func.name.indexOf('Filter') !== -1){
			this.filterRegister(func.name,func);
		}
  	}
  	register(arr) {
  		for(let item of arr){
  			switch (Object.prototype.toString.call(item)){
  				case '[object Function]':
	  				this._analysis(item);
  					break;
  				case '[object Object]':
  					this._analysis(item.default);
  				default:
  					break;
  			}
  		}
  	}
}
