function Game (props) {
	this.gamebox=document.getElementById(props.gameBoxId);
	this.newGamebtn=document.getElementById(props.newGameBtnId);
	this.messageBox=document.getElementById(props.messageBoxId);
	this.computerStepTimeout=props.computerStepTimeout;

	this.newGamebtn.onclick=this.initialize.bind(this);
	this.gamebox.onclick=this.gameboxClick.bind(this);
}

Game.prototype={
	initialize: function () {
 		this.gamebox.innerHTML='';
		this.none = [];
		this.cross = [];
		this.zero = [];
		this.isBlock=false;

		for (var x = 0; x < 3; x++) {
			for (var y = 0; y < 3; y++){
				var obj = {row: x, col: y}
				this.none.push(obj);
				var elem = document.createElement('div');
				elem.setAttribute('data-row', x);
				elem.setAttribute('data-col', y);
				this.gamebox.appendChild(elem);
			}
		}

		this.showMessage('Ваш ход');
 	},

 	showMessage: function (message) {
 		this.messageBox.innerHTML=message;
 	},

 	getRandomInt: function(min, max) {
		if(min<=max){
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		else{
			return null;
		}	
	},

	doStep: function (arrayName, noneIndex, domElement) {
		var array = arrayName == 'cross' ? this.cross : this.zero;
		array.push(this.none[noneIndex]);
		this.none.splice(noneIndex, 1);
		domElement.className = arrayName;
		if(this.checkWinner(array)){
			this.showMessage(arrayName=='cross'?'Поздравляем, Вы победили!':'Вы проиграли :(');
			return false;
		}

		if(!this.none.length) {
			this.showMessage('Ничья!');
			return false;
		}

		return true;
	},
 
 	checkWinner: function(array) {
 		var result = array.reduce(function(acc, item){
 			acc['col'+item.col]++;
 			acc['row'+item.row]++;
 			if (item.col == item.row) {
 				acc.d0++;
 			}
 			if (item.col + item.row == 2) {
 				acc.d1++;
 			}
 			return acc;
 		},
 		{
 			row0:0,
 			row1:0,
 			row2:0,
 			col0:0,
 			col1:0,
 			col2:0,
 			d0:0,
 			d1:0
 		}); 
 		return Object.values(result).some(function(item){
 			return item > 2;				
 		}); 
 	},

 	gameboxClick: function (event) {
		if (this.isBlock) {
			return;
		}

		var element = event.target;
		var col = element.getAttribute('data-col'); 
		var row = element.getAttribute('data-row');

		var index;

		for (var i=0; i < this.none.length; i++) {
			var a = this.none[i];
			if (a.row == row && a.col == col) {
				index = i;
				break;
			}
		}

		if (!(index >= 0)){
			return;
		}


		if (this.doStep('cross', index, element) ) {
			this.doComputerStep();
		}
 	},

 	doComputerStep: function() {
 		this.isBlock=true;
 		this.showMessage('<i class="fa fa-spinner fa-pulse fa-fw"></i>');
 		var that=this;

 		setTimeout ( function () {
			var indexRandom = that.getRandomInt(0, that.none.length-1);
			if(indexRandom===null){
				return;
			}
			var computerElement = that.gamebox.querySelector("div[data-row='" + that.none[indexRandom].row + "'][data-col='" + that.none[indexRandom].col + "']");
			if (that.doStep('zero', indexRandom, computerElement)) {
				that.isBlock=false;
				that.showMessage('Ваш ход');
			}
		}, this.computerStepTimeout);
 	}
}

window.onload = function () {
	var game=new Game({
		gameBoxId: 'gamebox',
		newGameBtnId: 'new-game',
		messageBoxId: 'message',
		computerStepTimeout: 500,

	});

	game.initialize();
}
