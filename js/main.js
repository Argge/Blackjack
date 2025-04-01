let number = document.querySelectorAll("number");
let symbol = document.getElementsByClassName("symbol");
let symbolMain = document.getElementsByClassName("symbolMain");
let randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {
    let number1 = document.getElementById("number1");
    let NumCard = randomNum();
    // let ColorCard = randomColorSymbol();
    // let Symbol = randomColorSymbol();
    if (NumCard === 1) {
        
    }
    number.textContent = "1";
});

function randomNum() {
    let num = Math.floor((Math.random()*(14-1)) + 1);
    console.log(num);
}

function randomColorSymbol() {
    let index = Math.floor((Math.random()*(4-1)) + 1);
    console.log(index);
}