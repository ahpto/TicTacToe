const gameBoard = (function() {  //assigns the module to a variable to be used to call module's methods
    function _gamePlay() {

    }
})();




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