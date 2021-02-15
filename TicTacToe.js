const gameBoard = (function() {  //assigns the module to a variable to be used to call module's methods
    function _gamePlay() {

    }
})();


const charScroll1 = document.querySelector(".char")
const btnPrev1 = document.querySelector("#btnPrev")
const btnNext1 = document.querySelector("#btnNext")
const charScroll2 = document.querySelector("#char2")
const btnPrev2 = document.querySelector("#btnPrev2")
const btnNext2 = document.querySelector("#btnNext2")
const itemWidth = document.querySelector('.charItem').clientWidth;

btnNext1.addEventListener("click", function(){
    charScroll2.scrollBy({left: itemWidth, top: 0, behavior: 'smooth'});
})


const charChooser1 = () => {
    
    const charItem = document.querySelectorAll(".charItem1");
    charItem[0].style.visibility = "visible";
    charItem[0].dataKey = "active";
    let nextChar;

    const charDisplay = () => {  
        for (i=0; i<charItem.length; i++) {
            if (i == 2) {nextChar = charItem[0]} else {
                nextChar = charItem[i+1]};
         if (charItem[i].dataKey==="active"){charItem[i].style.visibility="hidden"; 
        charItem[i].dataKey = ""; 
        nextChar.style.visibility="visible";
        nextChar.dataKey = "active"; break;}
        } 
    }
    btnPrev1.addEventListener("click", charDisplay);
}

charChooser1(); 