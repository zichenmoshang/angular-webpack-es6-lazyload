let uiTextDir = ($cacheFactory) => {
	return {
		restrict: 'A',
		require: '?ngModel',
		template: `<div class="btn-toolbar" ng-click="btnClick($event)">
						<div class="btn-group" style="margin-bottom: 5px;">
							<button type="button" class="btn btn-default ui-text-btn" ng-class="{true: 'active'}[btn.active]" data-id="{{$index}}" ng-blur="btnBlur($event)" ng-disabled="btnDisable" ng-repeat="btn in btns.slice(0,9)" ng-bind-html="btn.name | trustFilter"></button>
						</div>
						<div class="btn-group" style="margin-bottom: 5px;">
							<button type="button" class="btn btn-default ui-text-btn" ng-class="{true: 'active'}[btn.active]" data-id="{{$index + 8}}" ng-blur="btnBlur($event)" ng-disabled="btnDisable" ng-repeat="btn in btns.slice(9,18)" ng-bind-html="btn.name | trustFilter"></button>
						</div>
						<div class="btn-group" style="margin-bottom: 5px;">
							<button type="button" class="btn btn-default ui-text-btn" ng-class="{true: 'active'}[btn.active]" data-id="{{$index + 17}}" ng-blur="btnBlur($event)" ng-disabled="btnDisable" ng-repeat="btn in btns.slice(18,24)" ng-bind-html="btn.name | trustFilter"></button>
						</div>
						<div class="btn-group" style="margin-bottom: 5px;">
							<button type="button" class="btn btn-default ui-text-btn" ng-class="{true: 'active'}[btn.active]" data-id="{{$index + 23}}" ng-blur="btnBlur($event)" ng-disabled="btnDisable" ng-repeat="btn in btns.slice(24,28)" ng-bind-html="btn.name | trustFilter"></button>
						</div>
						<div class="btn-group" style="margin-bottom: 5px;">
							<button type="button" class="btn btn-default ui-text-btn"" ng-blur="btnBlur($event)" ng-disabled="true">
								Words:<span ng-bind="wordcount"></span>
							</button>
						</div>
					</div>
					<div ng-click="textareaClick($event)" ng-blur="textareaBlur($event)" ng-focus="textareaFocus($event)" ng-keyup="textareaKeyup($event)" class="textarea form-control" contenteditable="true" ng-model="html"></div>`,
		scope: {
			
		},
		link: (scope,ele,attr,ngModel) => {
			if(!ngModel) {
				throw new Error('ngModel is not defined');
			};
			scope.init = () => {
				scope.btnDisable = true;
				scope.wordcount = 0;
				ngModel.$render = () => {
					scope.html = ngModel.$viewValue;
				};
				
				scope.btns = [
					{
						name: 'h1',
						active: false,
						tagName: 'h1'
					},
					{
						name: 'h2',
						active: false,
						tagName: 'h2'
					},
					{
						name: 'h3',
						active: false,
						tagName: 'h3'
					},
					{
						name: 'h4',
						active: false,
						tagName: 'h4'
					},
					{
						name: 'h5',
						active: false,
						tagName: 'h5'
					},
					{
						name: 'h6',
						active: false,
						tagName: 'h6'
					},
					{
						name: 'P',
						active: false,
						tagName: 'p'
					},
					{
						name: 'Pre',
						active: false,
						tagName: 'pre'
					},
					{
						name: '<i class="fa fa-quote-right"></i>',
						active: false,
						tagName: 'blockquote'
					},
					{
						name: '<i class="fa fa-bold"></i>',
						active: false,
						tagName: 'b'
					},
					{
						name: '<i class="fa fa-italic"></i>',
						active: false,
						tagName: 'i'
					},
					{
						name: '<i class="fa fa-underline"></i>',
						active: false,
						tagName: 'u'
					},
					{
						name: '<i class="fa fa-strikethrough"></i>',
						active: false,
						tagName: 'strike'
					},
					{
						name: '<i class="fa fa-list-ul"></i>',
						active: false,
						tagName: 'ul'
					},
					{
						name: '<i class="fa fa-list-ol"></i>',
						active: false,
						tagName: 'ol'
					},
	//				{
	//					name: '<i class="fa fa-repeat"></i>',
	//					active: false
	//				},
	//				{
	//					name: '<i class="fa fa-undo"></i>',
	//					active: false
	//				},
	//				{
	//					name: '<i class="fa fa-ban"></i>',
	//					active: false
	//				},
					{
						name: '<i class="fa fa-align-left"></i>',
						active: false
					},
					{
						name: '<i class="fa fa-align-center"></i>',
						active: false
					},
					{
						name: '<i class="fa fa-align-right"></i>',
						active: false
					},
	//				{
	//					name: '<i class="fa fa-align-justify"></i>',
	//					active: false
	//				},
	//				{
	//					name: '<i class="fa fa-indent"></i>',
	//					active: false
	//				},
	//				{
	//					name: '<i class="fa fa-outdent"></i>',
	//					active: false
	//				},
					{
						name: '<i class="fa fa-code"></i>',
						active: false
					},
					{
						name: '<i class="fa fa-picture-o"></i>',
						active: false
					},
					{
						name: '<i class="fa fa-link"></i>',
						active: false
					},
					{
						name: '<i class="fa fa-youtube-play"></i>',
						active: false
					}
				]; 
			};
			
			scope.init();
			
			let currentDom;
			let domArr = [];
			
			let getSelectLine = () => {
					
			}
			
			let headMutex = (num) => {
				if(currentDom.className.indexOf('textarea') !== -1){
					currentDom.innerHTML = `<p>${currentDom.textContent}</p>`;
					currentDom = currentDom.children[0];
				}
				if(currentDom.tagName.toLowerCase() === `h${num+1}`){
					currentDom.outerHTML = `<p>${currentDom.textContent}</p>`;
				}
				for(let i = 0,len = 7;i < len; i++){
					if(num === i){
						scope.btns[i].active = true;
					}else{
						scope.btns[i].active = false;
					}
				}
				if(num === 6){
					currentDom.outerHTML = `<p>${currentDom.textContent}</p>`;
				}else{
					currentDom.outerHTML = `<h${num+1}>${currentDom.textContent}</h${num+1}>`;
				}
			}
			
			let leave = () => {
				scope.btnDisable = true;
				angular.forEach(scope.btns,(item) => {
					item.active = false;
				});
				$cacheFactory('htmlCache').put('html',ele.children()[1].innerHTML);
				ngModel.$setViewValue(ele.children()[1].innerHTML);
			};
			
			scope.btnClick = (e) => {
				switch (e.target.dataset.id){
					case '0':
						headMutex(0);
						break;
					case '1':
						headMutex(1);
						break;
					case '2':
						headMutex(2);
						break;
					case '3':
						headMutex(3);
						break;
					case '4':
						headMutex(4);
						break;
					case '5':
						headMutex(5);
						break;	
					case '6':
						headMutex(6);
						break;	
					default:
						break;
				}
			}
			
			scope.btnBlur = (e) => {
				if(e.relatedTarget && e.relatedTarget.className.indexOf('textarea') !== -1){
					
				}else{
					leave();
				};
			}
			
			scope.textareaFocus = (e) => {
				scope.btnDisable = false;
			}
			
			scope.textareaKeyup = (e) => {
				scope.wordcount = currentDom.textContent.length;
//				switch (e.keyCode){
//					case 8:
//						//backspace
//						wordcount--;
//						break;
//					case 46
//						//delete
//						break;
//					default:
//						break;
//				}
			}
			
			scope.textareaClick = (e) => {
				for(let dom of e.path){
					if(dom.className.indexOf('textarea') !== -1){
						break;
					}
					domArr.push(dom.tagName.toLowerCase());
				}
				angular.forEach(scope.btns,(item) => {
					if(domArr.indexOf(item.name) !== -1){
						item.active = true;
					}
				})
				currentDom = e.target;
			}
			
			
//			scope.$on('$destroy', function() {
//				$cacheFactory('htmlCache').put('html',ele.children()[1].innerHTML);
//				ngModel.$setViewValue(ele.children()[1].innerHTML);
////				ngModel.$render();
//	      	});
	      	
			scope.textareaBlur = (e) => {
				if(e.relatedTarget && e.relatedTarget.className.indexOf('ui-text-btn') !== -1){
					
				}else{
					leave();
				};
			}
		}
	}
}

export default uiTextDir;
