export default class listCtrl{
	constructor($http) {
	    $http.post('/getNote')
	    	.then((res) => {
	    		this.notes = res.data;
	    	})
	}
	selectNote(note){
		this.note = note;
	}
}
