//store the gameboard array inside the Gameboard object

const Gameboard = (function (){
    const gameboard = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    function isValid(position){
      return gameboard[position] == " ";
       
    }

    function playerMarker(marker, position){
       if(isValid(position)){
        gameboard[position] = marker;
        return true;
       }
    }

    let currentPlayer = 'X'
    function move(position){
       if(playerMarker(currentPlayer, position)){

        if(checkWinner()){
            return true;
        }
        if(draw()){
            return true;
        }
        currentPlayer = (currentPlayer == 'X') ? 'O' : 'X';
        return true;
       }
       return false;
    }

  function checkWinner(){
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for(const combination of winningCombinations){
        const [a,b,c] = combination;
        if(gameboard[a] == currentPlayer && gameboard[b] == currentPlayer
            && gameboard[c] == currentPlayer){
                return true;
                }
            }
        }

        function draw(){
           return gameboard.every(position => position !== " ") && !checkWinner();
        }

        function reset(){
           for(let i = 0; i < gameboard.length; i++){
            gameboard[i] = " ";
           }

           currentPlayer = 'X';
        }
    
  



    return {
        gameboard,
        isValid,
        currentPlayer,
        playerMarker,
        move,
        checkWinner,
        draw,
        reset
    };
})();

const Display = (function () {
    const grid = document.querySelector('.grid');

    function render(gameboard) {
        grid.textContent = '';
        
        gameboard.forEach((cell, index) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.index = index; 
            cellDiv.textContent = cell; 
            cellDiv.addEventListener('click', () => handleCellClick(index));
            grid.appendChild(cellDiv);
        });
    }

    function handleCellClick(index) {
        if (Gameboard.move(index)) {
            render(Gameboard.gameboard); 
            if (Gameboard.checkWinner()) {
                alert(`Player ${Gameboard.currentPlayer} wins!`);
            } else if (Gameboard.draw()) {
                alert("It's a draw!");
            }
        }
    }

    function reset() {
        Gameboard.reset();
        render(Gameboard.gameboard); 
    }

    return {
        render,
        reset
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    const resetBtn = document.getElementById('resetBtn');

    Display.render(Gameboard.gameboard);

    resetBtn.addEventListener('click', () => {
        Display.reset();
    });
});





