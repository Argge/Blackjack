let number = document.querySelectorAll(".number");
let symbol = document.getElementsByClassName("symbol");
let symbolMain = document.getElementsByClassName("symbolMain");
let randomBtn = document.getElementById("randomBtn");

// randomBtn.addEventListener("click", () => {
//     let number1 = document.getElementById("number1");
//     let NumCard = randomNum();
//     let ColorCard = randomColorSymbol();
//     let Symbol = randomColorSymbol();
//     if (NumCard === 1) { 
        
//     }
//     number.textContent = "1";
// });

number.forEach(function(num) {
    randomBtn.addEventListener("click", () => {
        // let NumCard = randomNum1();
        num.textContent = 12; 
    });
});

function randomNum() {
    let indexNum = Math.floor((Math.random()*(14-1)) + 1);
    console.log(indexNum);
}

function randomColorSymbol() {
    let indexCol = Math.floor((Math.random()*(4-1)) + 1);
    console.log(indexCol);
}

// test function witch value = 1
function randomNum1() {
    let indexNum = Math.floor((Math.random()*(1-1)) + 1);
    console.log(indexNum);
}