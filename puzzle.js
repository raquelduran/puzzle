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
		this.generateBoard();
	}
	generateBoard(){
		var numbers = [1,2,3,4,5,6,7,8," "];
		var order = [];
		for (var i=0; order.length < numbers.length; i++){ // is this correct?
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
} //model

class View{
	constructor(){
		this.drawTable();
	}

	drawTable(){
		var textTable = '<table id="t" border = "0" cellspacing ="5"> ';
		for(let i=0;i<3;i++){
			textTable += '<tr bgcolor = "#e0893c" height="100px">';
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

} //view

class Controller{
	constructor(){
		this.model = new Model();
		this.view = new View();
		this.start();
	}
	start(){
		for(let i=0;i<3;i++){
			for (let j=0;j<3;j++){
				this.view.placeNumber(i,j, this.model.board[i][j]);
			}
		}
	}
} //controller

window.onload = function(){
	controller = new Controller(); 	
}