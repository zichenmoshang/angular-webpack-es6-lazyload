export default class previewCtrl{
	constructor($cacheFactory) {
		let cache = $cacheFactory.get('htmlCache');
		if(cache){
			this.html = cache.get('html');
		}
	    
	}
}
