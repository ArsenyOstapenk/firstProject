(window.onload = function () {
	var none = [], cross = [], zero = [];

	for (var x = 0; x < 3; x++) {
		for (var y = 0; y < 3; y++){
			var obj = {row: x, col: y}
			none.push(obj);
			
		}
	}

	var isBlock=false;

	document.getElementById('gamebox').onclick = function(event){

		if (isBlock) {
			return;
		}
		isBlock=true;

		var element = event.target;
		var col = element.getAttribute('data-col'); 
		var row = element.getAttribute('data-row');

		var index;

		for (var i=0; i < none.length; i++) {
			var a = none[i];
			if (a.row == row && a.col == col) {
				index = i;
				break;
			}
		}

		if (!(index >= 0)){
			return;
		}

		

		doStep('cross', index, element);

		// checkWinner(cross);
		 
		setTimeout (
			function() {
				var indexRandom = getRandomInt(0, none.length-1);
				var computerElement = document.getElementById('gamebox').querySelector("div[data-row='" + none[indexRandom].row + "'][data-col='" + none[indexRandom].col + "']");
				doStep('zero', indexRandom, computerElement);
				isBlock=false; 
			}, 2000);


		// checkWinner(zero);

	}

	function getRandomInt(min, max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	function doStep(arrayName, noneIndex, domElement){
		var array = arrayName == 'cross' ? cross : zero;
		array.push(none[noneIndex]);
		none.splice(noneIndex, 1);
		domElement.className = arrayName;
	}
 
})()