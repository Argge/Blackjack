// let randomBtn = document.getElementById("randomBtn");
const randomBtn = document.getElementById("randomBtnCard")

let numberCard = null;
let symbolCard = null;
let symbolMain = null;

let value = 0;
const amountCards = [];

let playerPoints = 0;
let dealerPoints = 0;
let playerWins = 0;
let cardsInDeck = 52;

randomBtn.addEventListener("click", () => {
    amountCards.push(cardContentGenerateMain());
        
        if (value === 21) {
            // alert("You win");
            createModalWin("You win!");
        }
        else if (value > 21) {
            // alert("You loose");
            createModalWin("You loose");
        }
        else {}
        
    console.log(value);
});


function cardContentGenerateMain() {
    cardCreatingElements(defineNumber(), defineSymbol(), defineColor());
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
    symbolCard.classList.add(color);
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
    symbolCard.classList.add(color);
    bottomDiv.appendChild(numberCard);
    bottomDiv.appendChild(symbolCard);

}

function createModalWin(text) {
    let guiDiv = document.getElementById("gui");
    let modal = document.createElement("div");
    modal.classList.add("modalWin");
    guiDiv.appendChild(modal);

    let paragraph = document.createElement("p");
    paragraph.textContent = text;

    let resetBtn = document.createElement("button");
    resetBtn.classList.add("resetBtn");
    resetBtn.value = "Contine";
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
function randomNumber() {
    let indexNum = Math.floor((Math.random()*(15-2)) + 2);
    console.log(indexNum);
    return indexNum;
}

function randomSymbol() {
    let indexSym = Math.floor((Math.random()*(5-1)) + 1);
    console.log(indexSym);
    return indexSym;
}

function randomColor() {
    let indexCol = Math.floor((Math.random()*(3-1)) + 1);
    console.log(indexCol);
    return indexCol;
}

// Define functions: Number, Symbol, Color
function defineNumber() {
    let NumCard = randomNumber();
    
    if (NumCard <= 10) {
        if (NumCard === 2) {
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

    if (NumCard <= 10) {
        value += NumCard;
    }
    else if (NumCard === 11 || NumCard === 12 || NumCard === 13) {
        value += 10;
    }
    else if (NumCard === 14 && amountCards.length < 3) {
        value += 11;
    }
    else {
        value += 1;
    }

    return numberCard;
}

function defineSymbol() {
    
    let SymCard = randomSymbol();

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
    if (symbolCard === "♠" || symbolCard === "♣") {
        colorCard = "colorBlack";
    }
    else {
        colorCard = "colorRed";
    }

    return colorCard;
}