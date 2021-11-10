const playerButtons = document.querySelectorAll(".player-Button");

const gameBoard = (() => { // Module for the gameboard
    let board = Array(3).fill().map(() => Array(3)); 

    return {board}; 
})();

const playerFactory = (name, mark) => { // Factory function for the player
    const checkMark = () => console.log(mark); 
    return { name, checkMark };
};

function renderGameBoard(board) {
    const boardContainer = document.querySelector(".gameBoard-Container"); 

    for(let i = 0; i < gameBoard.board.length; i++) {
        //const brElement = document.createElement("br"); 
        //boardContainer.appendChild(brElement); 
        for(let j = 0; j < gameBoard.board[i].length; j++) {
            //console.log(gameBoard.board[i][j]); 
            const divSpot = document.createElement("div"); 
            divSpot.classList.add("board-spot");
            //divSpot.textContent = gameBoard.board[i][j]; 
            boardContainer.appendChild(divSpot); 
        }
    }
    
}

renderGameBoard(gameBoard.board); 

console.log(playerButtons);

for(let i = 0; i < playerButtons.length; i++) {
    const button = playerButtons[i]; 

    button.addEventListener("click", () => {
        
    });
}