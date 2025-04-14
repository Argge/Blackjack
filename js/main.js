const randomBtn = document.getElementById("randomBtnCard");

let numberCard = null;
let symbolCard = null;
let symbolMain = null;

let value = 0;
let amountCards = [];

let playerPoints = 0;
let dealerPoints = 0;
let playerWins = 0;
let cardsInDeck = 52;

randomBtn.addEventListener("click", () => {

    if (amountCards.length < 1) {
        amountCards.push(cardContentGenerateMain());
        amountCards.push(cardContentGenerateMain());
    }
    else {
        const content = document.getElementById("content");
        amountCards.push(cardContentGenerateMain());
        
        cardsInDeck--;
        let deckCardsCounter = document.getElementById("deckCardsCounter");
        deckCardsCounter.textContent = "Cards in deck: " + cardsInDeck; 

            
        if (value === 21) {
            randomBtn.disabled = true;
            playerPoints += value;
            playerWins++;
            modalWinClose("You win!", "playerPointsCounter", "Your points: ", playerPoints);
        }
        else if (value > 21) {
            randomBtn.disabled = true;
            dealerPoints += value;
            modalWinClose("You loose", "dealerPointsCounter", "Dealer points: ", dealerPoints);
        }
        else {}
        
        if (cardsInDeck === 0) {
            if (playerPoints > dealerPoints) {
                modalWinFinalClose("You win game!");
            }
            else {
                modalWinFinalClose("You loose game!");
            }
        }
    }

    console.log("Now: " + value);
});


// Functions for modal window
function modalWinClose(text, id , counterPlayerDealer, pointsPlayerDealer) {
    createModalWin(text);
    console.log("After: " + value);
    value = 0;
    
    const resetBtn = document.getElementById("resetBtn");
    const modalWin = document.getElementById("modalWin");
    const playerWinsCounter = document.getElementById("playerWinsCounter");

    resetBtn.addEventListener("click", () => {
        let counter = document.getElementById(id);
        counter.textContent = counterPlayerDealer + pointsPlayerDealer;
        playerWinsCounter.textContent = "Your wins: " + playerWins;
        content.innerHTML = "";
        modalWin.remove();
        modalGuiWin.remove();
        randomBtn.disabled = false;
        amountCards = [];
    });
}

function modalWinFinalClose(looseOrWin) {
    createModalWin(looseOrWin);
            const resetBtn = document.getElementById("resetBtn");
            const modalWin = document.getElementById("modalWin");
            const modalGuiWin = document.getElementById("modalGuiWin");
            
            resetBtn.addEventListener("click", () => {
                let playerPointsCounter = document.getElementById("playerPointsCounter");
                let dealerPointsCounter = document.getElementById("dealerPointsCounter");
                playerPointsCounter.textContent = "Player points: 0";
                dealerPointsCounter.textContent = "Dealer points: 0";
                content.innerHTML = "";
                modalWin.remove();
                modalGuiWin.remove();

                cardsInDeck = 52;
                deckCardsCounter.textContent = "Cards in deck: " + cardsInDeck;
                amountCards = [];
            });
}


// Functions for creating something
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
    const mainDiv = document.getElementById("main");
    let modalGuiDiv = document.createElement("div");
    modalGuiDiv.id = "modalGuiWin";
    mainDiv.appendChild(modalGuiDiv);
    
    let modalDiv = document.createElement("div");
    modalDiv.classList.add("modalWin");
    modalDiv.id = "modalWin";
    modalGuiDiv.appendChild(modalDiv);

    let paragraph = document.createElement("p");
    paragraph.textContent = text;
    modalDiv.appendChild(paragraph);

    let resetBtn = document.createElement("button");
    resetBtn.id = "resetBtn";
    resetBtn.textContent = "Contine";
    modalDiv.appendChild(resetBtn);
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

    // playerPoints = value;

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