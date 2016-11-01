/*
Puzzle. Se desea implementar una web para la realizaci n de puzzles. Un puzzle no es ó
m s que un tablero cuadrado con un hueco que podemos mover y que permite á
reordenar las piezas. Se pide por tanto la implementaci n de una clase que represente ó
este juego teniendo en cuenta:
1. La dimensi n puede variar, se escoger en la creaci n. ó á ó
2. El espacio en blanco s lo se mueve arriba, abajo, izquierda, derecha, controlando ó
por supuesto que sea un movimiento v lido. á
3. Debe llevarse un control del tiempo m nimo para resolverlo, as como el n mero de í í ú
movimientos realizados.
4. Los tableros se generar n aleatoriamente. á
5. Implementar s un m todo dibujar() que imprimir en pantalla el tablero para poder á é á
ser probado
*/
class Model{ 
	constructor(){
		this.board = [[0,0,0],[0,0,0],[0,0,0]];
		this.movements = 0;
		this.generateBoard();
	}
	generateBoard(){
		var numbers = [1,2,3,4,5,6,7,8," "];
		var order = [];
		while(order.length < numbers.length){
			var newNumber = numbers[Math.floor((Math.random()* numbers.length))];
			if (order.indexOf(newNumber)==-1){
				order.push(newNumber);
			}
		}

		var n = 0;
		for(let i=0;i<3;i++){
			for (let j=0;j<3;j++){
				this.board[i][j] = order[n];
				n += 1;
			}
		}

		console.log(order);
		console.log(this.board);
	}
	blankSpace(){
		var list = []
		for(let i=0;i<3;i++){
			for (let j=0;j<3;j++){
				if (this.board[i][j] == " "){
					list.push(i);
					list.push(j);
				}
			}
		}
		return list
	}

	moveNumber(row1,column1){
		var number = this.board[row1][column1];
		this.board[this.blankSpace()[0]][this.blankSpace()[1]] = number;
		this.board[row1][column1] = " ";
		
	}
	checkIfWinner(){
		if (this.board[0][0] == 1 && this.board[0][1] == 2 && this.board[0][2] == 3 && this.board[1][0] == 4 &&
			this.board[1][1] == 5 && this.board[1][2] == 6 && this.board[2][0] == 7 && this.board[2][1] == 8 &&
			this.board[2][2] == " "){
			return true;
		}
		else{
			return false;
		}
	}

} //model

class View{
	constructor(){
		this.drawTable();
	}

	drawTable(){
		var textTable = '<table id="t" border = "0" cellspacing ="5"> ';
		for(let i=0;i<3;i++){
			textTable += '<tr bgcolor = "#ea5b5b" height="100px">';
			for (let j=0;j<3;j++){
				textTable += '<td id="'+i+j+'"width="100"></td>';
			}
		}
		textTable += '</tr></table>';
		//return textTable
		document.getElementById("table").innerHTML = textTable;
	}
	placeNumber(row,column, number){
		document.getElementById(row.toString()+column.toString()).innerHTML = number;
	}
	createAlert(message){
		alert(message);
	}

} //view

class Controller{
	constructor(){
		this.model = new Model();
		this.view = new View();
		this.start();
	}
	start(){
		this.model.generateBoard();
		this.placeBoard();
		this.model.movements = 0;
		document.onkeydown = (e)=> this.pressedKey(e,this);
		document.getElementById("notifications").innerHTML = "Movimientos: " +this.model.movements;
	}

	placeBoard(){
			for(let i=0;i<3;i++){
			for (let j=0;j<3;j++){
				this.view.placeNumber(i,j, this.model.board[i][j]);
			}
		}	

	}
	pressedKey(e, that){ //that means the controller's this

		e = e || window.event;
		if (e.keyCode == '38') { // up arrow
			if (that.model.blankSpace()[0] + 1 < 3){
				that.model.moveNumber(that.model.blankSpace()[0]+1,that.model.blankSpace()[1]); 
			}
    	}
    	else if (e.keyCode == '40') { // down arrow
    		if (that.model.blankSpace()[0] - 1 > -1){
    			that.model.moveNumber(that.model.blankSpace()[0]-1,that.model.blankSpace()[1]);
    		}
        }
    	else if (e.keyCode == '37') { // left arrow
       		if (that.model.blankSpace()[1] + 1 < 3){
       			that.model.moveNumber(that.model.blankSpace()[0],that.model.blankSpace()[1]+1);
       		}
    	}
    	else if (e.keyCode == '39') { // right arrow
    		if (that.model.blankSpace()[1] - 1 > -1){
    			that.model.moveNumber(that.model.blankSpace()[0],that.model.blankSpace()[1]-1);

    		}
    	}
  		that.placeBoard();
		that.model.movements += 1;
		document.getElementById("notifications").innerHTML = "Movimientos: " +that.model.movements;
		
		if (that.model.checkIfWinner()== true){
			that.view.createAlert("Has ganado en "+ that.model.movements + " movimientos");
			that.view.createAlert("Un nuevo juego va a comenzar");
			that.start();
		}
	}

} //controller

window.onload = function(){
	controller = new Controller(); 	
}