/* const gameBoard = (() => {  //game module
    
    let whoseTurn = 0;
    let numTurns = 0;
    const gameBoardDivs = document.querySelectorAll(".board"); 

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

    //when "New Match" is clicked board and values are reset.
    //if first ever match, players are created, names and characters are finalized, and who plays first is determined with Math.random().
    const newMatch = () => {
        
        clearInterval(blinkIntro);
        if (whoseTurn == 0) {
            const player1 = makePlayer(document.querySelector("#name1"), document.querySelector('#player1'));
            const player2 = makePlayer(document.querySelector("#name2"), document.querySelector('#player2'))
            nameEntry(); 
            gameChar();
            whoPlaysFirst();
        }
        
        numTurns = 0;

        if (whoseTurn == 2) {
            player2.textContent = "Player 2 make your move"; 
            player1.textContent = "";
        }
    
        else {
            player1.textContent = "Player 1 make your move"; 
            player2.textContent = "";
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

})(); //end game module */



const charChooser = (btnPrev, btnNext, charItem) => {
    
    charItem[0].style.visibility = "visible";
    charItem[0].dataKey = "active";
    let nextChar;
    

    const charDisplayPrev = () => {  
        for (i=0; i<charItem.length; i++) {
            if (i == 3) {nextChar = charItem[0]} else {
                nextChar = charItem[i+1]};
         if (charItem[i].dataKey==="active"){charItem[i].style.visibility="hidden"; 
        charItem[i].dataKey = ""; 
        nextChar.style.visibility="visible";
        nextChar.dataKey = "active"; break;}
        } 
    }

    const charDisplayNext = () => {  
        for (i=0; i<charItem.length; i++) {
            if (i == 0) {nextChar = charItem[3]} else {
                nextChar = charItem[i-1]};
         if (charItem[i].dataKey==="active"){charItem[i].style.visibility="hidden"; 
        charItem[i].dataKey = ""; 
        nextChar.style.visibility="visible";
        nextChar.dataKey = "active"; break;}
        } 
    }

    btnPrev.addEventListener("click", charDisplayPrev);
    btnNext.addEventListener("click", charDisplayNext);
}

charChooser(document.querySelector("#btnPrev"), document.querySelector("#btnNext"), document.querySelectorAll(".charItem1")); 
charChooser(document.querySelector("#btnPrev2"), document.querySelector("#btnNext2"), document.querySelectorAll(".charItem2"));



let player1Array = [];
let player2Array = [];
let player1Score = 0; 
let player2Score = 0;
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
let whoseTurn = 0;
let numTurns = 0; 
const gameBoardDivs = document.querySelectorAll(".board");

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
    const charRotate = () => {    
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

const player1a = makePlayer(document.querySelector('#player1'), document.querySelector("#p1Score"), document.querySelector("#char1"), document.querySelectorAll(".charItem1"));
const player2a = makePlayer(document.querySelector('#player2'), document.querySelector("#p2Score"),document.querySelector("#char2"), document.querySelectorAll(".charItem2"));

const whoPlaysFirst = () => {
    if (whoseTurn == 0) {
        let x = (Math.floor(Math.random() * 2));
        if (x==0) {player1a.playerText(""); player2a.playerText("Player 2 make your move"); whoseTurn = 2;}  
        else {player2a.playerText(""); player1a.playerText("Player 2 make your move"); whoseTurn = 1;}
    }
}

const gameWon = (playerArray) => {

    if (numTurns == 9) {player1a.playerText("tie!"); player2a.playerText("tie!");} 
    
    let winString = playerArray.join(""); 
    //an array of winning regex's: 
    const regexArray = [/(1.*|2.*|3.*){3,}/, /(4.*|5.*|6.*){3,}/, /(7.*|8.*|9.*){3,}/, /(1.*|4.*|7.*){3,}/, /(2.*|5.*|8.*){3,}/,
        /(3.*|6.*|9.*){3,}/, /(1.*|5.*|9.*){3,}/, /(3.*|5.*|7.*){3,}/]
    for (i=0; i<regexArray.length; i++) { if (regexArray[i].test(winString))
        {   

            if (whoseTurn == "2") {winning(player1a)}
            
            else {winning(player2a)}
        } 
    };       
}


const gamePlay = (e) => {
    
    if (whoseTurn == 2) {
        player2a.playerText(""); 
        player1a.playerText("Player 1 make your move");
        if (e.target.textContent == "") {
            e.target.textContent = "O"; 
            whoseTurn = 1; 
            player2a.playerArray.push([parseInt(e.target.dataset.key)]);
            numTurns++;
            gameWon(player2a.playerArray);
        }
    }
    else {
        player1a.playerText(""); 
        player2a.playerText("Player 2 make your move");
        if (e.target.textContent == ""){
            e.target.textContent = "X"; 
            whoseTurn = 2; 
            player1a.playerArray.push([parseInt(e.target.dataset.key)]);
            numTurns++; 
            gameWon(player1a.playerArray);
        }
    }
}

//finalizes selected character during gameplay:
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

const newMatch = () => {
    nameEntry(); 
    gameChar();
    clearInterval(blinkIntro);
    whoPlaysFirst();
    player1a.playerArray = [];
    player2a.playerArray = [];
    player1a.rotateRemove();
    player2a.rotateRemove();
    numTurns = 0;

    if (whoseTurn == 2) {
        player2.textContent = "Player 2 make your move"; 
        player1.textContent = "";
    }

    else {
        player1.textContent = "Player 1 make your move"; 
        player2.textContent = "";
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

button = document.querySelector("button");
button.addEventListener("click", newMatch);

const blinkBoard = () => {
    for (i=0; i<gameBoardDivs.length; i++) {
        if (gameBoardDivs[i].textContent == "X") {gameBoardDivs[i].textContent = "O"}
        else {gameBoardDivs[i].textContent = "X"}
    }
}   

const blinkIntro = setInterval(blinkBoard, 1000);

const winning = (player) => {
    player.textContent = "winner!";
    player.playerScore++; 
    player.scoreUpdate(player.playerScore); 
    if (player == player1a) {player2a.playerText("")}
    else {player1a.playerText("")}
    player.charRotate();
    for (i=0; i<gameBoardDivs.length; i++) {
        gameBoardDivs[i].removeEventListener("click", gamePlay);
    };
}

//name entry function that finalizes player names:
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

/* //factory function for the 2 players:
const makePlayer = (playerDiv) => {

    const playerArray = () => [];
    const playerScore = () => 0;
    const playerText = (x) => {
        playerDiv.textContent = x;
    } 

}
const player1a = makePlayer(document.querySelector('#player1'));
const player2a = makePlayer(document.querySelector('#player2'));  */