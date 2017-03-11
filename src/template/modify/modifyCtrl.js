export default class modifyCtrl{
	constructor($http,$cacheFactory) {
		this.$http = $http;
		this.$cacheFactory = $cacheFactory;
		let cache = this.$cacheFactory.get('htmlCache');
	    this.note = {
	    	titleType : 2,
        	titles : [{name:'原创',id:1},{name:'转载',id:2}],
        	heading : '',
        	htmlVariable : cache ? cache.get('html') : '',
        	noteTypes : ['随笔','译文','教程'],
        	selNoteType: '随笔',
        	noteClassifies : ['HTML/CSS','JavaScript','Node.js','MongoDb'],
        	selNoteClassify : 'HTML/CSS'
	    }
	}
        
    save(){
    	if(this.noteForm.$valid){
    		var formData = new FormData();
    		formData.append('titleType',this.note.titleType);
    		formData.append('heading',this.note.heading);
    		formData.append('noteTypes',this.note.selNoteType);
    		formData.append('noteClassifies',this.note.selNoteClassify);
    		let cache = this.$cacheFactory.get('htmlCache');
    		if(cache){
    			formData.append('html',cache.get('html'));
    		}
    		formData.append('date',Date.now()+'');
    		this.$http.post('/upNote',formData,{
    				headers:{
    					'Content-Type': undefined  //取消默认json格式
    				},
    				transformRequest: angular.identity,
    			})
	        	.then((res) => {
	        			debugger
	        	});
    	}
	};
}
