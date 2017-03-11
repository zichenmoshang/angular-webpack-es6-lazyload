class titleNode{
	constructor(titleName){
		this.titleName = titleName;
	}
}

class menuNode{
	constructor(menuName,href,hasSecond,menuIcon,menuColor){
		this.menuName = menuName;
		this.href = href;
		this.hasSecond = hasSecond;
		this.menuIcon = menuIcon;
		this.menuColor = menuColor;
		this.subNode = [];
	}
}

class subNode{
	constructor(href,name){
		this.href = href;
		this.name = name;
	}
}

export default class asideService{
	getNavList(){
		let navList = [],
			navNode = {
				menuNode: []
			};
		navNode.menuNode.push(new menuNode('笔记','#',true,'icon-notebook','text-info-dker'));
		navNode.menuNode.push(new menuNode('我的笔记','main.list',false,'icon-list','text-success'));
		Array.prototype.push.call(
			navNode.menuNode[0].subNode,
			new subNode('main.note.modify','发布笔记')
		);
		navList.push(navNode);
		return navList;
	}
}
