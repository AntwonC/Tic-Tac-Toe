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

function createPlayer(playerInput, index) {
    const playerInputs = document.querySelectorAll(".user-Container");
    const pickMark = document.querySelectorAll(".mark-Button");

    if ( playerInput.value.localeCompare("") === 0 ) {
        if ( playerInputs[index].childNodes.length >= 1 ) {
            return -1; 
        } 
       const alertEmpty = document.createElement("div");
       alertEmpty.textContent = "Enter a non-empty player name!"; 
       alertEmpty.style.color = "red"; 
       playerInputs[index].appendChild(alertEmpty); 
       //console.log(playerInput);
   } else {
      // Remove the alert first
     //  const numberOfNodes = playerInputs[index].childNodes; 
       if ( playerInputs[index].firstChild !== null ) {
           playerInputs[index].firstChild.remove(); 
       } 
       // Call function to get the mark that is selected. 
       // Call upon error if the mark is not selected yet
       console.log("Player One Mark: " + checkPlayerOneMark(pickMark)); 
       console.log("Player Two Mark: " + checkPlayerTwoMark(pickMark)); 
       //const playerObject = playerFactory(playerInput.value)
       const playerNameDiv = document.createElement("div"); 
       playerNameDiv.textContent = playerInput.value;
       playerNameDiv.style.color = "red"; 
       playerNameDiv.style.fontSize = "30px";
       playerInputs[index].appendChild(playerNameDiv); 
       playerInput.value = ""; 
       
   }

}

function checkPlayerOneMark(listOfMarks) {
    if ( listOfMarks[0].style.color.localeCompare("red") === 0 ) {
        return listOfMarks[0].textContent; 
    } else if ( listOfMarks[1].style.color.localeCompare("red") === 0 ) {
        return listOfMarks[1].textContent; 
    }
}

function checkPlayerTwoMark(listOfMarks) {
    if ( listOfMarks[2].style.color.localeCompare("red") === 0 ) {
        return listOfMarks[2].textContent; 
    } else if ( listOfMarks[3].style.color.localeCompare("red") === 0 ) {
        return listOfMarks[3].textContent; 
    }
}

function highlightMarkPicked(currentButton, listOfButtons, index) {
    // NOTE: Probably switch to switch clause instead
    console.log(index); 
    if ( index === 0 ) {
        index += 1;  

        if ( currentButton.style.color.localeCompare("") === 0 ) {
            currentButton.style.color = "red"; 
            listOfButtons[index].disabled = true;  
            
            // Player 2's option is only the other option 
            const playerTwoValue = listOfButtons[index].textContent;
            console.log(playerTwoValue);
            if ( playerTwoValue.localeCompare("O") === 0 ) {
                listOfButtons[3].style.color = "red"; 
                listOfButtons[2].disabled = true;
            }
        }   

    } else if ( index === 1 ) {
        index -= 1; 

        if ( currentButton.style.color.localeCompare("") === 0 ) {
            currentButton.style.color = "red"; 
            listOfButtons[index].disabled = true;  
            
            // Player 2's option is only the other option 
            const playerTwoValue = listOfButtons[index].textContent;
            console.log(playerTwoValue);

            if ( playerTwoValue.localeCompare("X") === 0 ) {
                listOfButtons[2].style.color = "red"; 
                listOfButtons[3].disabled = true;
            }
        }   
    } else if ( index === 2 ) {
        index += 1; 

        if ( currentButton.style.color.localeCompare("") === 0 ) {
            currentButton.style.color = "red"; 
            listOfButtons[index].disabled = true;  
            
            // Player 2's option is only the other option 
            const playerOneValue = listOfButtons[index].textContent;
            console.log(playerOneValue);
            if ( playerOneValue.localeCompare("O") === 0 ) {
                listOfButtons[1].style.color = "red"; 
                listOfButtons[0].disabled = true;
            } 
        }   
    } else if ( index === 3 ) {
        index -= 1; 

        if ( currentButton.style.color.localeCompare("") === 0 ) {
            currentButton.style.color = "red"; 
            listOfButtons[index].disabled = true;  
            
            // Player 2's option is only the other option 
            const playerOneValue = listOfButtons[index].textContent;
            console.log(playerOneValue);
            if ( playerOneValue.localeCompare("X") === 0 ) {
                listOfButtons[0].style.color = "red"; 
                listOfButtons[1].disabled = true;
            } 
        }   
    }
    //currentButton.style.color = "red"; 
   // console.log(currentButton.style.color); 


    //return currentButton.value; 
    //console.log(currentButton); 
}

function addListenersToButtons() {
    for(let i = 0; i < playerButtons.length; i++) {
        const button = playerButtons[i]; 
        const playerInputs = document.querySelectorAll(".player-Input-Text");
    
        button.addEventListener("click", () => {
            createPlayer(playerInputs[i], i); 
        });
    }
}

function addListenersToMarkButtons() {
    const pickMark = document.querySelectorAll(".mark-Option");
    const markButtons = document.querySelectorAll(".mark-Button");

    for(let i = 0; i < markButtons.length; i++) {
        const button = markButtons[i]; 
       // const playerInputs = document.querySelectorAll(".player-Input-Text");
        //console.log(button.textContent);

        button.addEventListener("click", () => {
            //createPlayer(playerInputs[i], i); 
            highlightMarkPicked(button, markButtons, i); 
        });

    }
}

renderGameBoard(gameBoard.board); 
addListenersToButtons(); 
addListenersToMarkButtons();

