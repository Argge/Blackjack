let randomBtn = document.getElementById("randomBtn");

let numberCard = null;
let symbolCard = null;
let symbolMain = null;

randomBtn.addEventListener("click", () => {
    cardContentGenerateMain(); 
});




function cardContentGenerateMain() {
    cardCreatingElements(defineNumber(), defineSymbol(), defineColor());
    console.log(symbolCard)
}

function cardCreatingElements(number, symbol, color) {
    // Creating BG of card
    let contentDiv = document.getElementById("content");
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    contentDiv.appendChild(cardDiv);


    // Creating number & symbol on top side of card
    let topDiv = document.createElement("div");
    topDiv.classList.add("top");
    cardDiv.appendChild(topDiv);

    createNumSym(number, symbol);
    numberCard.classList.add(color);
    topDiv.appendChild(numberCard);
    topDiv.appendChild(symbolCard);


    // Creating main symbol
    createSymMain(symbol);
    symbolMain.classList.add(color);
    cardDiv.appendChild(symbolMain);


    // Creating number & symbol on top side of card
    let bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom");
    cardDiv.appendChild(bottomDiv);

    createNumSym(number, symbol);
    numberCard.classList.add(color);
    bottomDiv.appendChild(numberCard);
    bottomDiv.appendChild(symbolCard);
}

function createNumSym(number, symbol) {
    numberCard = document.createElement("p");
    numberCard.classList.add("number");
    numberCard.textContent = number;

    symbolCard = document.createElement("p")
    symbolCard.classList.add("symbol")
    symbolCard.textContent = symbol;
}

function createSymMain(symbol) {
    symbolMain = document.createElement("p");
    symbolMain.classList.add("symbolMain");
    symbolMain.textContent = symbol;
}

// Functions for generating content of card
function cardNum(symbol) {
    for (let i = 0; i < number.length; i++) {
        number[i].textContent = symbol;
    }
}

function randomNumber() {
    let indexNum = Math.floor((Math.random()*(14-1)) + 1);
    console.log(indexNum);
    return indexNum;
}

function randomSymbol() {
    let indexSym = Math.floor((Math.random()*(4-1)) + 1);
    console.log(indexSym);
    // let text = indexSym.toString();
    return indexSym;
}

function randomColor() {
    let indexCol = Math.floor((Math.random()*(3-1)) + 1);
    console.log(indexCol);
    // let text = indexCol.toString();
    return indexCol;
}

function ColorTo(color1, color2, object) {
    for (let i = 0; i < object.length; i++) {
        object[i].classList.remove(color1);
        object[i].classList.add(color2);
    } 
}

function SymbolTo(symbol, object) {
    for (let i = 0; i < object.length; i++) {
        object[i].textContent = symbol;
    }
}

function SymbolsJQKA(symbol, object) {
     for (let i = 0; i < object.length; i++) {
        object[i].textContent = symbol;
    }
}


// Define functions: Number, Symbol, Color
function defineNumber() {
    let NumCard = randomNumber();
    let numberCard = null;
    
    if (NumCard <= 10) {
        if (NumCard === 1) {
            numberCard = "1";
        }
        else if (NumCard === 2) {
            numberCard = "2";
        }
        else if (NumCard === 3) {
            numberCard = "3";
        }
        else if (NumCard === 4) {
            numberCard = "4";
        }
        else if (NumCard === 5) {
            numberCard = "5";
        }
        else if (NumCard === 6) {
            numberCard = "6";
        }
        else if (NumCard === 7) {
            numberCard = "7";
        }
        else if (NumCard === 8) {
            numberCard = "8";
        }
        else if (NumCard === 9) {
            numberCard = "9";
        }
        else {
            numberCard = "10";
        }
    }
    else if (NumCard === 11) {
        numberCard = "J";
    }
    else if (NumCard === 12) {
        numberCard = "Q";
    }
    else if (NumCard === 13) {
        numberCard = "K";
    }
    else {
        numberCard = "A";
    }

    return numberCard;
}

function defineSymbol() {
    
    let SymCard = randomSymbol();
    symbolCard = null;

        if (SymCard === 1) {
            symbolCard = "♠";
        }
        else if (SymCard === 2) {
            symbolCard = "♥";
        }
        else if (SymCard === 3) {
            symbolCard = "♣";
        }
        else {
            symbolCard = "♦";
        }

    return symbolCard;
}

function defineColor() {
    // let ColCard = randomColor();
    // let colorCard = null;

    // if (ColCard === 1) {
    //     colorCard = "colorBlack";
    // }
    // else {
    //     colorCard = "colorRed";
    // }

    // return colorCard;

    let colorCard = null;

    if (symbolCard === "♠" || symbolCard === "♣") {
        colorCard = "colorBlack";
    }
    else {
        colorCard = "colorRed";
    }

    return colorCard;
}