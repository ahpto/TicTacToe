const gameBoard = (() => {  //assigns the module to a variable to be used to call module's methods
    
    const player1 = document.querySelector('#player1');
    const player2 = document.querySelector('#player2');
    let whoseTurn = 0;

    const whoPlaysFirst = () => {
        let x = (Math.floor(Math.random() * 2));
        if (x==0) {player2.textContent = "Player 2 make your move"; whoseTurn = 2;}  
        else {player1.textContent = "Player 1 make your move"; whoseTurn = 1;}     
    }
    return {whoPlaysFirst}
    
})();



//displays rotating character choice:
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
const gameBoardDivs = document.querySelectorAll(".board");

const whoPlaysFirst = () => {
    if (whoseTurn == 0) {
        let x = (Math.floor(Math.random() * 2));
        if (x==0) {player1.textContent = ""; player2.textContent = "Player 2 make your move"; whoseTurn = 2;}  
        else {player2.textContent = ""; player1.textContent = "Player 1 make your move"; whoseTurn = 1;}
    }
}

const gameWon = (playerArray) => {
    let winString = playerArray.join(""); 
    const regexArray = [/(1.*|2.*|3.*){3,}/, /(4.*|5.*|6.*){3,}/, /(7.*|8.*|9.*){3,}/, /(1.*|4.*|7.*){3,}/, /(2.*|5.*|8.*){3,}/,
        /(3.*|6.*|9.*){3,}/, /(1.*|5.*|9.*){3,}/, /(3.*|5.*|7.*){3,}/]
    for (i=0; i<regexArray.length; i++) { if (regexArray[i].test(winString))
        {
            if (whoseTurn == "2") {player1.textContent = "Player 1 wins!";
            player1Score+=1; 
            document.querySelector("#p1Score").textContent = `Score: ${player1Score}`; 
            player2.textContent = "";
            for (i=0; i<gameBoardDivs.length; i++) {
                gameBoardDivs[i].removeEventListener("click", gamePlay);
                };
            document.querySelector("#char").style.animation = "rotate 3s 1";
            let chars1 = document.querySelectorAll(".charItem1");
            for (i=0; i<chars1.length; i++) {
                chars1[i].style.width = "300px"
                chars1[i].style.height = "300px";
            }
            break;
            }
            else {player2.textContent = "Player 2 wins!";
            player2Score+=1; 
            document.querySelector("#p1Score").textContent = `Score: ${player2Score}`; 
            player1.textContent = ""}
            for (i=0; i<gameBoardDivs.length; i++) {
                gameBoardDivs[i].removeEventListener("click", gamePlay);
                };
            document.querySelector("#char").style.animation = "rotate 3s 1";
            let chars1 = document.querySelectorAll(".charItem1");
            for (i=0; i<chars1.length; i++) {
                chars1[i].style.width = "300px"
                chars1[i].style.height = "300px";
            }
            break;
        } 
    };       
}


const gamePlay = (e) => {

    if (whoseTurn == 2) {
        player2.textContent = ""; 
        player1.textContent = "Player 1 make your move";
        if (e.target.textContent == "") {
            e.target.textContent = "O"; 
            whoseTurn = 1; 
            player2Array.push([parseInt(e.target.dataset.key)]); 
            gameWon(player2Array);
        }
    }
    else {
        player1.textContent = ""; 
        player2.textContent = "Player 2 make your move";
        if (e.target.textContent == ""){
            e.target.textContent = "X"; 
            whoseTurn = 2; 
            player1Array.push([parseInt(e.target.dataset.key)]);
            gameWon(player1Array);
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
    player1Array=[];
    player2Array=[];

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


// functions for winning: 
const winChar = (char, charItem) => {
    document.querySelector(char).style.animation = "rotate 3s 1";
        let winChars = document.querySelectorAll(charItem);
        for (i=0; i<winchars.length; i++) {
            winChars[i].style.width = "300px"
            winChars[i].style.height = "300px";
        }
}

const winScore = (player) => {
            player.textContent = "winner!";
            player1Score++; 
            document.querySelector("#p1Score").textContent = `Score: ${player1Score}`; 
            player2.textContent = "";
}

//name entry function:
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
