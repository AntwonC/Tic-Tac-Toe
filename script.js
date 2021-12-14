const playerButtons = document.querySelectorAll(".player-Button");

const gameBoard = (() => { // Module for the gameboard
    //let board = Array.from(Array(3), () => new Array(3).fill("0")); 
    let board = ["-1","-1","-1","-1","-1","-1","-1","-1","-1"]; 
     /*   for (let i = 0; i < 3; i++) {
            board[i] = new Array(3); // make each element an array
        } */

    let playerOne = null;
    let playerTwo = null;
    let gameStarted = false;

    return {board, playerOne, playerTwo, gameStarted}; 
})();

const playerFactory = (name, mark) => { // Factory function for the player
    const checkMark = () => console.log(mark); 
    return { name, mark, checkMark };
};

function renderGameBoard(board) {
    const boardContainer = document.querySelector(".gameBoard-Container"); 

    for(let i = 0; i < board.length; i++) {
        //const brElement = document.createElement("br"); 
        //boardContainer.appendChild(brElement); 
            //console.log(gameBoard.board[i][j]); 
            const divSpot = document.createElement("div"); 
            divSpot.classList.add("board-spot");
            //divSpot.textContent = gameBoard.board[i][j]; 
            boardContainer.appendChild(divSpot); 
        
    }  
}

function createPlayer(playerInput, index, listOfPlayerButtons) {
    const playerInputs = document.querySelectorAll(".user-Container");
    const pickMark = document.querySelectorAll(".mark-Button");

    if ( index === 1 ) {
        // Dealing with Player 2
        console.log("We are dealing with Player 2"); 
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
           if ( playerInputs[index].firstChild !== null ) {
               playerInputs[index].firstChild.remove(); 
           } 
           // Call function to get the mark that is selected. 
           // Call upon error if the mark is not selected yet
           if ( checkPlayerTwoMark(pickMark) === -1 ) { // Check if mark is picked
            const alertMark = document.createElement("div"); 
            alertMark.textContent = "Please pick a mark!"; 
            alertMark.style.color = "red"; 
            alertMark.fontSize = "20px"; 
            playerInputs[index].appendChild(alertMark); 
            return -1; 

        } else  {
         // Remove all the text 
         while (playerInputs[index].firstChild) {
             playerInputs[index].removeChild(playerInputs[index].firstChild);
         }
        }
          const playerNameDiv = document.createElement("div"); 
          playerNameDiv.textContent = playerInput.value;
          playerNameDiv.style.color = "red"; 
          playerNameDiv.style.fontSize = "30px";

          const playerMark = document.createElement("div"); // Adding the player mark to userContainer
          playerMark.textContent = checkPlayerTwoMark(pickMark); 
          playerMark.style.color = "red"; 
          playerMark.style.fontSize = "50px";
          playerInputs[index].appendChild(playerNameDiv); 
          playerInputs[index].appendChild(playerMark); 
          listOfPlayerButtons.disabled = true;
          // Creating playerTwo object...
          const playerObject = playerFactory(playerInput.value, checkPlayerTwoMark(pickMark));
          console.log(`playerObject2: ${playerObject.name}`);
          gameBoard.playerTwo = playerObject; 
          playerInput.value = ""; 
    
          //return playerObject; 
       }
    } else if ( index === 0 ) {
        // Dealing with Player 1
        console.log("We are dealing with Player 1"); 
        if ( playerInput.value.localeCompare("") === 0 ) { // Empty username
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
           if ( checkPlayerOneMark(pickMark) === -1 ) {
               const alertMark = document.createElement("div"); 
               alertMark.textContent = "Please pick a mark!"; 
               alertMark.style.color = "red"; 
               alertMark.fontSize = "20px"; 
               playerInputs[index].appendChild(alertMark); 
               return -1; 

           } else  {
            // Remove all the text 
            while (playerInputs[index].firstChild) {
                playerInputs[index].removeChild(playerInputs[index].firstChild);
            }
           }
          const playerNameDiv = document.createElement("div"); 
          playerNameDiv.textContent = playerInput.value;
          playerNameDiv.style.color = "red"; 
          playerNameDiv.style.fontSize = "30px";

          const playerMark = document.createElement("div"); 
          playerMark.textContent = checkPlayerOneMark(pickMark); 
          playerMark.style.color = "red"; 
          playerMark.style.fontSize = "50px";
          playerInputs[index].appendChild(playerNameDiv); 
          playerInputs[index].appendChild(playerMark); 
          //console.log(`button: ${listOfPlayerButtons.textContent}`);
          listOfPlayerButtons.disabled = true;
          // Creating playerOne object
          const playerObject = playerFactory(playerInput.value, checkPlayerOneMark(pickMark));
          //console.log(`playerObject1: ${playerObject.name}`);
          gameBoard.playerOne = playerObject; 
         // console.log(`gameBoard playerOne: ${gameBoard.playerOne.name} | playerOne Mark: ${gameBoard.playerOne.mark}`);
          playerInput.value = ""; 
    
         // return playerObject;
       }
    }


}

function checkPlayerOneMark(listOfMarks) {
    if ( listOfMarks[0].style.color.localeCompare("red") === 0 ) {
        return listOfMarks[0].textContent; 
    } else if ( listOfMarks[1].style.color.localeCompare("red") === 0 ) {
        return listOfMarks[1].textContent; 
    }

    return -1;
}

function checkPlayerTwoMark(listOfMarks) {
    if ( listOfMarks[2].style.color.localeCompare("red") === 0 ) {
        return listOfMarks[2].textContent; 
    } else if ( listOfMarks[3].style.color.localeCompare("red") === 0 ) {
        return listOfMarks[3].textContent; 
    }

    return -1;
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
    const startGameButton = document.querySelector("#begin-Game");
    const resetGameButton = document.querySelector("#reset-Game");
    const alertContainer = document.querySelector(".alert-Container");

    for(let i = 0; i < playerButtons.length; i++) {
        const button = playerButtons[i]; 
        const playerInputs = document.querySelectorAll(".player-Input-Text");
        const playerButton = document.querySelectorAll(".player-Button");
        
        button.addEventListener("click", () => {
             createPlayer(playerInputs[i], i, playerButton[i]);
            //console.log("Player Mark: " + player.mark);  
        });
    }

    startGameButton.addEventListener("click", () => {
        startGame(gameBoard.board, gameBoard.playerOne, gameBoard.playerTwo); 
    });

    resetGameButton.addEventListener("click", () => {
        resetGame(gameBoard.board, gameBoard.playerOne, gameBoard.playerTwo);
        if ( alertContainer.childNodes.length >= 1 ) {
            alertContainer.firstChild.remove(); 
    
            const divAlert = document.createElement("div"); 
            divAlert.textContent = "Game has been reset. Click the \"Start Game\" button to begin the game."; 
            divAlert.style.color = "red"; 
            divAlert.fontSize = "30px";
            alertContainer.appendChild(divAlert); 
        
        } 
    });

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



function addClickToBoard(board, playerOne, playerTwo, firstTurn) {
    const boardContainer = document.querySelector(".gameBoard-Container"); 
    const winnerContainer = document.querySelector(".winner-Container"); 
    const alertContainer = document.querySelector(".alert-Container"); 

    let didWinYet = false; 

    
    if ( playerOne === null || playerTwo === null ) {
        console.log(`No players created yet.`);
    } else {
        console.log(`playerOne: ${playerOne.name} | playerTwo: ${playerTwo.name}`);
        console.log(`player One Mark: ${playerOne.mark} | player Two Mark: ${playerTwo.mark}`);
        // Getting a list of divs and putting that into an array to iterate on to add textContent
        let arr = Array.from(boardContainer.childNodes); 
        // TO DO: Need to be able to put the marks on the board in gameBoard module to check for winners
        // TO DO: Make sure the next mark is on a proper spot
        let changePlayerTurn = true; 
        const playerFirstTurn = document.createElement("div"); 

        if ( firstTurn === 1 ) {
            console.log("O goes first");
            playerFirstTurn.textContent = "O goes first!"; 
            playerFirstTurn.fontSize = "35px";
            changePlayerTurn = false; 
        } else {
            console.log("X goes first"); 
            playerFirstTurn.textContent = "X goes first!"; 
            playerFirstTurn.fontSize = "35px";
            changePlayerTurn = true;
        }

        alertContainer.appendChild(playerFirstTurn);
        let turnCounter = 0; 
        
         
            for(let i = 0; i < arr.length; i++) {
                
                arr[i].addEventListener("click", () => {
                    // Exit out if already won
                    if ( didWinYet ) {
                        console.log("Already won"); 
                        return; 
                    }
                    // console.log(`arr[i].textContent: ${arr[i].textContent}`); 
                // Check for mark. For some reason, it is undefined, but this will work as just need 
                // to not skip another players turn
                if ( arr[i].textContent === undefined ) {
                    return;
                }
                    
                if ( changePlayerTurn ) {
                        board[i] = playerOne.mark; 
                        arr[i].textContent = playerOne.mark;
                        arr[i] = playerOne.mark; 
                        changePlayerTurn = false;  
                    } else {
                        board[i] = playerTwo.mark; 
                        arr[i].textContent = playerTwo.mark;
                        arr[i] = playerTwo.mark; 
                        changePlayerTurn = true;  
                }

                turnCounter++; 
                printBoard(board); 
                if ( turnCounter >= 5 ) {

                        let winnerMark = checkWinner(board, arr, i);
                        console.log(`winnerMark: ${winnerMark}`);
                        const winAlert = document.createElement("div");
                        const tieAlert = document.createElement("div");

                        let tieCondition = checkTie(board, i);
                        console.log(`tieCondition: ${tieCondition}`);

                        if ( winnerMark.localeCompare(playerOne.mark) === 0 ) {
                            winAlert.textContent = playerOne.name + " is the winner!"; 
                            winAlert.color = "red"; 
                            winAlert.fontSize = "25px"; 
                            winnerContainer.appendChild(winAlert); 
                            didWinYet = true; 
                        } else if ( winnerMark.localeCompare(playerTwo.mark) === 0 ) {
                            winAlert.color = "red"; 
                            winAlert.fontSize = "25px"; 
                            winAlert.textContent = playerTwo.name + " is the winner!"; 
                            winnerContainer.appendChild(winAlert); 
                            didWinYet = true; 
                        } else if ( tieCondition ) {

                            if ( winnerContainer.childNodes.length >= 1 ) {
                                return; 
                            } else {
                                tieAlert.textContent = "Tie Game!";
                                tieAlert.style.color = "red"; 
                                tieAlert.style.fontSize = "50px";
                                //tieAlert.style.fontFamily = "bold";
                                winnerContainer.appendChild(tieAlert); 
                            }

                        } 
                    }
                // console.log("Clicked div!"); 
                // console.log(arr[i]);
                //console.log(arr[i]); 
                });
            // console.log(arr[i]); 
                    
            }
        }
    
    //console.log(boardContainer.childNodes); 
}

function checkTie(boardArray, boardSpot) {
   // console.log("-------------------START---------------------------");
    
    //console.log(`In checkTie(): boardArray: ${boardArray.toString()}`);
    for(let i = 0; i < boardArray.length; i++) {
       // console.log(`boardArray[i]: ${boardArray[i]}`);

        if ( boardArray[i].localeCompare("-1") === 0 ) {
            return false;
        }
    }
    //console.log("-------------------END--------------------------");

     
    return true;
}

function checkWinner(board, boardArray, boardSpot) {
    printBoard(board); 
    console.log(`boardSpotMark: ${board[boardSpot]}`);

    // Hard code each spot 
    if ( boardSpot === 0 ) { // 0 spot
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[boardSpot+1].localeCompare(boardSpotMark) === 0) && (board[boardSpot+2].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[3].localeCompare(boardSpotMark) === 0) && (board[6].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        } else if ( (board[4].localeCompare(boardSpotMark) === 0) && (board[8].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        }
    } else if ( boardSpot === 1 ) {
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[boardSpot-1].localeCompare(boardSpotMark) === 0) && (board[boardSpot+1].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[4].localeCompare(boardSpotMark) === 0) && (board[7].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        }
    } else if ( boardSpot === 2 ) {
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[5].localeCompare(boardSpotMark) === 0) && (board[8].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[4].localeCompare(boardSpotMark) === 0) && (board[6].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        } else if ( (board[1].localeCompare(boardSpotMark) === 0) && (board[0].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } 
    } else if ( boardSpot === 3 ) {
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[0].localeCompare(boardSpotMark) === 0) && (board[6].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[4].localeCompare(boardSpotMark) === 0) && (board[5].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        }
    } else if ( boardSpot === 4 ) {
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[1].localeCompare(boardSpotMark) === 0) && (board[7].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[3].localeCompare(boardSpotMark) === 0) && (board[5].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        } else if ( (board[0].localeCompare(boardSpotMark) === 0) && (board[8].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        }
    } else if ( boardSpot === 5 ) {
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[2].localeCompare(boardSpotMark) === 0) && (board[8].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[3].localeCompare(boardSpotMark) === 0) && (board[4].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        } 
    } else if ( boardSpot === 6 ) {
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[0].localeCompare(boardSpotMark) === 0) && (board[3].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[7].localeCompare(boardSpotMark) === 0) && (board[8].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        } else if ( (board[4].localeCompare(boardSpotMark) === 0) && (board[2].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        }
    } else if ( boardSpot === 7 ) {
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[1].localeCompare(boardSpotMark) === 0) && (board[4].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[6].localeCompare(boardSpotMark) === 0) && (board[8].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        }
    } else if ( boardSpot === 8 ) {
        let boardSpotMark = board[boardSpot]; // Get the mark in the spot 
        if ( (board[0].localeCompare(boardSpotMark) === 0) && (board[4].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark; 
        } else if ( (board[5].localeCompare(boardSpotMark) === 0) && (board[2].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        } else if ( (board[6].localeCompare(boardSpotMark) === 0) && (board[7].localeCompare(boardSpotMark) === 0) ) {
            return boardSpotMark;
        }
    }

    return "-1"; // Nobody has won the game yet
}

function determineStartTurn(playerOne, playerTwo) {
    console.log(`-------------------DETERMINE START TURN----------------------------------`);
    let randomTurn = Math.floor(Math.random() * ( 1 - 0 + 1) + 0 ); 
    
    console.log(`randomTurn: ${randomTurn}`);
    console.log(`-------------------DETERMINE START TURN----------------------------------`);
    return randomTurn;
}

function startGame(board, playerOne, playerTwo) {
    const startGameButton = document.querySelector("#begin-Game");
    const alertContainer = document.querySelector(".alert-Container");

    if ( playerOne === null || playerTwo === null ) {
        
        if ( alertContainer.childNodes.length >= 1 ) {
            return -1;
        }

        const divAlert = document.createElement("div"); 
        divAlert.textContent = "Add all players to the game.";
        divAlert.style.color = "red"; 
        divAlert.fontSize = "30px";
        alertContainer.appendChild(divAlert); 
    }   else {

        if ( alertContainer.childNodes.length >= 1 ) {
            alertContainer.firstChild.remove(); 
        }

        const divAlert = document.createElement("div"); 
        divAlert.textContent = "Game started.";
        divAlert.style.color = "red"; 
        divAlert.fontSize = "30px";
        alertContainer.appendChild(divAlert);
        
        // Reset the board before 
        resetGame(board, playerOne, playerTwo);
        let getFirstTurn = determineStartTurn(playerOne, playerTwo); 
        addClickToBoard(board, playerOne, playerTwo, getFirstTurn);

    }

}

function resetGame(board, playerOne, playerTwo) {
    const alertContainer = document.querySelector(".alert-Container");
    const boardContainer = document.querySelector(".gameBoard-Container"); 
    const winnerContainer = document.querySelector(".winner-Container"); 
    
    printBoard(board);

    for(let i = 0; i < board.length; i++) {
        board[i] = "-1"; 
    }

    let arr = Array.from(boardContainer.childNodes); 

    // Removes all children from the winnerContainer to empty it
    while ( winnerContainer.firstChild ) {
        winnerContainer.removeChild(winnerContainer.firstChild); 
    }


    console.log(`length: ${winnerContainer.childNodes.length}`);


    // TO DO: Need to reset the divs as well
    for(let i = 0; i < arr.length; i++) {
        arr[i].textContent = null; 
        //arr[i].removeEventListener("click", ());
    }

}

function printBoard(board) {
    console.log(board);
}

renderGameBoard(gameBoard.board); 
addListenersToButtons(); 
addListenersToMarkButtons();
//addClickToBoard(gameBoard.board, gameBoard.playerOne, gameBoard.playerTwo);
printBoard(gameBoard.board); 




