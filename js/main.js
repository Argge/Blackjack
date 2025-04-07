let number = document.getElementsByClassName("number");
let symbol = document.getElementsByClassName("symbol");
let symbolMain = document.getElementsByClassName("symbolMain");
let randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {
    let NumCard = randomNum();
    let ColCard = randomColor();
    if (NumCard <= 10) {
        cardNum(NumCard);
    }
    else if (NumCard === "11") {
        cardNum("J");
    }
    else if (NumCard === "12") {
        cardNum("Q")
    }
    else if (NumCard === "13") {
        cardNum("K")
    }
    else {
        cardNum("A")
    }

    if (ColCard === "1") {
        ColorTo("colorRed", "colorBlack", number);
        ColorTo("colorRedBG", "colorBlackBG", symbol);
        ColorTo("colorRedBG", "colorBlackBG", symbolMain);
    }
    else {
        ColorTo("colorBlack", "colorRed", number);
        ColorTo("colorBlackBG", "colorRedBG", symbol);
        ColorTo("colorBlackBG", "colorRedBG", symbolMain); 
    }
});



function cardNum(symbol) {
    for (let i = 0; i < number.length; i++) {
        number[i].textContent = symbol;
    }
}

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

function ColorTo(color1, color2, object) {
    for (let i = 0; i < object.length; i++) {
        object[i].classList.remove(color1);
        object[i].classList.add(color2);
    } 
}