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
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
let whoseTurn = 0;

const whoPlaysFirst = () => {
    let x = (Math.floor(Math.random() * 2));
    if (x==0) {player1.textContent = ""; player2.textContent = "Player 2 make your move"; whoseTurn = 2;}  
    else {player2.textContent = ""; player1.textContent = "Player 1 make your move"; whoseTurn = 1;}     
}

const gameWon = (playerArray) => {
    let winString = playerArray.join(""); 
    const regexArray = [/(1|2|3){3}/, /(4|5|6){3}/, /(7|8|9){3}/, /(1|4|7){3}/, /(2|5|8){3}/,
        /(3|6|9){3}/, /(1|5|9){3}/, /(3|5|7){3}/]
    for (i=0; i<regexArray.length; i++) { if (regexArray[i].test(winString)){console.log("winner")} }; 
        
        
}

const newGame = () => {
    whoPlaysFirst();
    player1Array=[];
    player2Array=[];
    const gameBoardDivs = document.querySelectorAll(".board");
    for (i=0; i<gameBoardDivs.length; i++) { 
        gameBoardDivs[i].textContent= "";
        gameBoardDivs[i].addEventListener("click", (e) => {
        if (whoseTurn == 2) {if (e.target.textContent == "") {e.target.textContent = "O"; whoseTurn = 1; 
        player2.textContent = ""; player1.textContent = "Player 1 make your move";
        player2Array.push([parseInt(e.target.dataset.key)]); console.log(player2Array.join());
        gameWon(player2Array);}
        }
        else {if (e.target.textContent == ""){e.target.textContent = "X"; whoseTurn = 2; 
        player1.textContent = ""; player2.textContent = "Player 2 make your move";
        gameArray[parseInt(e.target.dataset.key)-1] = "x"; console.log(gameArray);
        gameWon();}}
        });
    }

}

document.querySelector("button").addEventListener("click", newGame);