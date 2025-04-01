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
        let NumCard = randomNum();
        num.textContent = NumCard;
        let ColCard = randomColorSymbol();
        
    });
});

function randomNum() {
    let indexNum = Math.floor((Math.random()*(14-1)) + 1);
    console.log(indexNum);
    // let text = String.fromCharCode(indexNum);
    let text = indexNum.toString();
    return text;
}

function randomColorSymbol() {
    let indexCol = Math.floor((Math.random()*(4-1)) + 1);
    console.log(indexCol);
    let text = indexCol.toString();
    return text;
}

// test function witch value = 1
function randomNum1() {
    let indexNum = Math.floor((Math.random()*(1-1)) + 1);
    console.log(indexNum);
    let text = indexNum.toString();
    return text;
}