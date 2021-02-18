//global variable:
const gameBoardDivs = document.querySelectorAll(".board"); 

//creates an alternating blinking board as an intro when page is loaded:
const blinkBoard = () => {
    for (i=0; i<gameBoardDivs.length; i++) {
        if (gameBoardDivs[i].textContent == "X") {gameBoardDivs[i].textContent = "O"}
        else {gameBoardDivs[i].textContent = "X"}
    }
}  
const blinkIntro = setInterval(blinkBoard, 1000);

//factory function for the 2 players:
const makePlayer = (playerDiv, scoreDiv, char, charItems) => {

    const playerArray = [];
    const playerScore = 0;
    const playerText = (alpha) => {
        playerDiv.textContent = alpha;
    } 
    const scoreUpdate = (playerScore) => {
    scoreDiv.textContent = `Score: ${playerScore}`;
    }
    const charRotate = () => {    //character rotates and grows on win 
        char.style.animation = "rotate 2s";
        for (i=0; i<charItems.length; i++) {
            charItems[i].style.width = "300px"
            charItems[i].style.height = "300px";
        }
    }
    const rotateRemove = () => {
        char.style.animation = "none";
    }

    return {playerArray, playerScore, playerText, scoreUpdate, charRotate, rotateRemove}
};

//game module:
const gameBoard = (() => {  
    
    let whoseTurn = 0;
    let numTurns = 0;

    const player1 = makePlayer(document.querySelector('#player1'), document.querySelector("#p1Score"), document.querySelector("#char1"), document.querySelectorAll(".charItem1"));
    const player2 = makePlayer(document.querySelector('#player2'), document.querySelector("#p2Score"),document.querySelector("#char2"), document.querySelectorAll(".charItem2"));

    //displays rotating cast of characters for players to choose from:
    const charChooser = (btnPrev, btnNext, charItem) => {
        
        charItem[0].style.visibility = "visible";
        charItem[0].dataKey = "active";
        let nextChar;

        const charDisplayPrev = () => {  
            for (i=0; i<charItem.length; i++) {
                if (i == 3) {
                    nextChar = charItem[0]} 
                else {
                    nextChar = charItem[i+1]
                };
            if (charItem[i].dataKey==="active"){
                charItem[i].style.visibility="hidden"; 
                charItem[i].dataKey = ""; 
                nextChar.style.visibility="visible";
                nextChar.dataKey = "active"; break;
                }
            } 
        }

        const charDisplayNext = () => {  
            for (i=0; i<charItem.length; i++) {
                if (i == 0) {
                    nextChar = charItem[3]
                    } 
                else {
                    nextChar = charItem[i-1]
                };
            if (charItem[i].dataKey==="active"){
                charItem[i].style.visibility="hidden"; 
                charItem[i].dataKey = ""; 
                nextChar.style.visibility="visible";
                nextChar.dataKey = "active"; break;
                }
            } 
        }

        btnPrev.addEventListener("click", charDisplayPrev);
        btnNext.addEventListener("click", charDisplayNext);
    }


    //name entry function that finalizes player names for gameplay:
    const nameEntry = () => {
        const playerName = document.querySelectorAll(".name");
        const nameLabel = document.querySelectorAll("label");
        if (!document.querySelector(".nameAdded")) {
            for (i=0; i<2; i++) {
                let pNameDiv = playerName[i];
                let pName = playerName[i].value;
                const nameDiv = document.createElement("div");
                pNameDiv.replaceWith(nameDiv);
                nameDiv.textContent = pName;
                nameDiv.classList.add("nameAdded");
                nameLabel[i].style.display="none";
            }
        }    
    }

    //finalizes selected characters for gameplay:
    const gameChar = () => {
        let chars;
        if (document.querySelector(".scroller")) {
            chars = document.querySelectorAll(".scroller");
            for (i=0; i<2; i++)  {
                chars[i].classList.add("scrollerGame");
                chars[i].classList.remove("scroller");
            }
        }
        let btns = document.querySelectorAll(".btn");
        for (i=0; i<4; i++) {
            btns[i].style.visibility = "hidden";
        }
    }

    //invokes functions for winning player:
    const winning = (player) => { 
        player.playerText("winner!");
        player.playerScore++; 
        player.scoreUpdate(player.playerScore); 
        if (player == player1) {player2.playerText("")}
        else {player1.playerText("")}
        player.charRotate();
        for (i=0; i<gameBoardDivs.length; i++) {
            gameBoardDivs[i].removeEventListener("click", gamePlay);
        };
    }

    //tests player arrays to winning combinations to find winner or tie:
    const gameWon = (playerArray) => { 
        
        let winString = playerArray.join(""); 
        //an array of winning regex's: 
        const regexArray = [/(1.*|2.*|3.*){3,}/, /(4.*|5.*|6.*){3,}/, /(7.*|8.*|9.*){3,}/, /(1.*|4.*|7.*){3,}/, /(2.*|5.*|8.*){3,}/,
            /(3.*|6.*|9.*){3,}/, /(1.*|5.*|9.*){3,}/, /(3.*|5.*|7.*){3,}/]
        for (i=0; i<regexArray.length; i++) { if (regexArray[i].test(winString))
            {   

                if (whoseTurn == "2") {winning(player1)}
                
                else {winning(player2)};
                
            }
            else if (!regexArray[i].test(winString) && numTurns == 9) {player1.playerText("tie!"); player2.playerText("tie!");} 
        };       
    }

    //board and values updated according to game play:
    const gamePlay = (e) => {

        if (whoseTurn == 2) {
            player2.playerText(""); 
            player1.playerText("Player 1 make your move");
            if (e.target.textContent == "") {
                e.target.textContent = "O"; 
                whoseTurn = 1; 
                player2.playerArray.push([parseInt(e.target.dataset.key)]);
                numTurns++;
                gameWon(player2.playerArray);
            }
        }
        else {
            player1.playerText(""); 
            player2.playerText("Player 2 make your move");
            if (e.target.textContent == ""){
                e.target.textContent = "X"; 
                whoseTurn = 2; 
                player1.playerArray.push([parseInt(e.target.dataset.key)]);
                numTurns++; 
                gameWon(player1.playerArray);
            }
        }
    }

    //function for random first player:
    const whoPlaysFirst = () => {
        if (whoseTurn == 0) {
            let x = (Math.floor(Math.random() * 2));
            if (x==0) {player1.playerText(""); player2.playerText("Player 2 make your move"); whoseTurn = 2;}  
            else {player2.playerText(""); player1.playerText("Player 2 make your move"); whoseTurn = 1;}
        }
    }

    //when "New Match" is clicked, board and values are reset:
    //if first ever match, players are created, names and characters are finalized, and first player is determined.
    const newMatch = () => {
        nameEntry(); 
        gameChar();
        clearInterval(blinkIntro);
        whoPlaysFirst();
        player1.playerArray = [];
        player2.playerArray = [];
        player1.rotateRemove();
        player2.rotateRemove();
        numTurns = 0;
    
        if (whoseTurn == 2) {
            player2.playerText("Player 2 make your move"); 
            player1.playerText("");
        }
    
        else {
            player1.playerText("Player 1 make your move"); 
            player2.playerText("");
        }
    
        const charImg = document.querySelectorAll("img");
        for (i=0; i<charImg.length; i++) {
            charImg[i].style.height = "100px"
            charImg[i].style.width = "100px"
        }
        
        for (i=0; i<gameBoardDivs.length; i++) { 
            gameBoardDivs[i].textContent= "";
            gameBoardDivs[i].addEventListener("click", gamePlay);
        }
    }
    
    charChooser(document.querySelector("#btnPrev"), document.querySelector("#btnNext"), document.querySelectorAll(".charItem1")), 
    charChooser(document.querySelector("#btnPrev2"), document.querySelector("#btnNext2"), document.querySelectorAll(".charItem2"));
   
    button = document.querySelector("button");
    button.addEventListener("click", newMatch); //initiates new match

})(); //end game module
