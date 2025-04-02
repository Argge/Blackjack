let number = document.getElementsByClassName("number");
let symbol = document.getElementsByClassName("symbol");
let symbolMain = document.getElementsByClassName("symbolMain");
let randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {
    let NumCard = randomNum();
    let ColCard = randomColor();
    for (let i = 0; i < number.length; i++) {
        number[i].textContent = NumCard;
    }
    if (ColCard === 1) {
        for (let i = 0; i < number.length; i++) {
            number[i].classList.remove("colorRed");
        }    
    }
});

function randomNum() {
    let indexNum = Math.floor((Math.random()*(14-1)) + 1);
    console.log(indexNum);
    let text = indexNum.toString();
    return text;
}

function randomSymbol() {
    let indexSym = Math.floor((Math.random()*(4-1)) + 1);
    console.log(indexSym);
    let text = indexSym.toString();
    return text;
}

function randomColor() {
    let indexCol = Math.floor((Math.random()*(3-1)) + 1);
    console.log(indexCol);
    let text = indexCol.toString();
    return text;
}