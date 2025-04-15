const hitBtn = document.getElementById("hitBtn");
const standBtn = document.getElementById("standBtn");

const coinBtn1 = document.getElementById("coin1");
const coinBtn5 = document.getElementById("coin5");
const coinBtn25 = document.getElementById("coin25");
const coinBtn50 = document.getElementById("coin50");
const coinBtn100 = document.getElementById("coin100");
const coinBtn500 = document.getElementById("coin500");

let playerBankCounter = document.getElementById("playerBankCounter");
let gameBankCounter = document.getElementById("gameBankCounter");

let numberCard = null;
let symbolCard = null;
let symbolMain = null;

let value = 0;
let valueDealer = 0;
let amountCards = [];
let amountCardsDealer = [];

let playerPoints = 0;
let dealerPoints = 0;
let playerWins = 0;
let cardsInDeck = 52;
let playerBank = 100;
let gameBank = 0;

hitBtn.addEventListener("click", () => {

    if (gameBank === 0) {
        hitBtn.disabled = true;
        modalTypeText("Did a bet");
    }
    else {
        if (amountCards.length < 1) {

            amountCards.push(cardContentGenerateMain("content"));
            amountCards.push(cardContentGenerateMain("content"));
            amountCardsDealer.push(cardContentGenerateMain("contentDealer"));
            amountCardsDealer.push(cardBackSideCreate("contentDealer"));

            if (value === 21) {
                hitBtn.disabled = true;
                playerPoints += value;
                playerWins++;
                gameBank *= 2.5;
                playerBank += gameBank;
                playerBankCounter.textContent = "Your bank: " + playerBank + "$";
                gameBankCounter.textContent = "Game bank: 0$";
                modalWinClose("Blackjack!", "playerPointsCounter", "Your points: ", playerPoints);
            }
        }
        else {
            const content = document.getElementById("content");
            const contentDealer = document.getElementById("contentDealer")
            amountCards.push(cardContentGenerateMain("content"));
            
            cardsInDeck--;
            let deckCardsCounter = document.getElementById("deckCardsCounter");
            deckCardsCounter.textContent = "Cards in deck: " + cardsInDeck; 
    
                
            if (value === 21) {
                hitBtn.disabled = true;
                playerPoints += value;
                playerWins++;
                gameBank *= 2;
                playerBank += gameBank;
                playerBankCounter.textContent = "Your bank: " + playerBank + "$";
                gameBankCounter.textContent = "Game bank: 0$";
                modalWinClose("You win!", "playerPointsCounter", "Your points: ", playerPoints);
            }
            else if (value > 21) {
                hitBtn.disabled = true;
                dealerPoints += value;
                gameBankCounter.textContent = "Game bank: 0$";
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
    }
});

standBtn.addEventListener("click", () => {
    const contentDealer = document.getElementById("contentDealer");
    contentDealer.lastChild.remove();
    amountCardsDealer.push(cardContentGenerateMain("contentDealer"));


});

// Coin buttons
coinBtn1.addEventListener("click", () => {
    if (playerBank >= 1) {
        playerBank--;
        gameBank++;
        playerBankCounter.textContent = "Your bank: " + playerBank + "$";
        gameBankCounter.textContent = "Game bank: " + gameBank + "$";
    }
    else {
        modalTypeText("You need more money!")
    }
});

coinBtn5.addEventListener("click", () => {
    if (playerBank >= 5) {
        playerBank -= 5;
        gameBank += 5;
        playerBankCounter.textContent = "Your bank: " + playerBank + "$";
        gameBankCounter.textContent = "Game bank: " + gameBank + "$";
    }
    else {
        modalTypeText("You need more money!")
    }
});

coinBtn25.addEventListener("click", () => {
    if (playerBank >= 25) {
        playerBank -= 25;
        gameBank += 25;
        playerBankCounter.textContent = "Your bank: " + playerBank + "$";
        gameBankCounter.textContent = "Game bank: " + gameBank + "$";
    }
    else {
        modalTypeText("You need more money!")
    }
});

coinBtn50.addEventListener("click", () => {
    if (playerBank >= 50) {
        playerBank -= 50;
        gameBank += 50;
        playerBankCounter.textContent = "Your bank: " + playerBank + "$";
        gameBankCounter.textContent = "Game bank: " + gameBank + "$";
    }
    else {
        modalTypeText("You need more money!")
    }
});

coinBtn100.addEventListener("click", () => {
    if (playerBank >= 100) {
        playerBank -= 100;
        gameBank += 100;
        playerBankCounter.textContent = "Your bank: " + playerBank + "$";
        gameBankCounter.textContent = "Game bank: " + gameBank + "$";
    }
    else {
        modalTypeText("You need more money!")
    }
});

coinBtn500.addEventListener("click", () => {
    if (playerBank >= 500) {
        playerBank -= 500;
        gameBank += 500;
        playerBankCounter.textContent = "Your bank: " + playerBank + "$";
        gameBankCounter.textContent = "Game bank: " + gameBank + "$";
    }
    else {
        modalTypeText("You need more money!")
    }
});



// Functions for modal window
function modalTypeText(text) {
    createModalWin(text);
    const resetBtn = document.getElementById("resetBtn");
    const modalWin = document.getElementById("modalWin");
    const modalGuiWin = document.getElementById("modalGuiWin");

    resetBtn.addEventListener("click", () => {
        modalWin.remove();
        modalGuiWin.remove();
        hitBtn.disabled = false;
    });
}

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
        contentDealer.innerHTML = "";
        modalWin.remove();
        modalGuiWin.remove();
        hitBtn.disabled = false;
        amountCards = [];
        gameBank = 0;
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
function cardContentGenerateMain(id) {
    cardCreatingElements(id, defineNumber(), defineSymbol(), defineColor());
}

function cardCreatingElements(id, number, symbol, color) {
    // defineValue(value, number);

    // Creating BG of card
    let contentDiv = document.getElementById(id);
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

function cardBackSideCreate(id) {
    let contentDiv = document.getElementById(id);
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("cardBack");
    contentDiv.appendChild(cardDiv);
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

    playerPoints = value;

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

// function defineValue(value, number) {
//     if (number === "1") {
//         value++;
//     }
//     else if (number === "2") {
//         value += 2;
//     }
//     else if (number === "3") {
//         value += 3;
//     }
//     else if (number === "4") {
//         value += 4;
//     }
//     else if (number === "5") {
//         value += 5;
//     }
//     else if (number === "6") {
//         value += 6;
//     }
//     else if (number === "7") {
//         value += 7;
//     }
//     else if (number === "8") {
//         value += 8;
//     }
//     else if (number === "9") {
//         value += 9;
//     }
//     else if (number === "10") {
//         value += 10;
//     }
//     else if (number === "J") {
//         value += 10;
//     }
//     else if (number === "Q") {
//         value += 10;
//     }
//     else if (number === "K") {
//         value += 10;
//     }
//     else if (number === "A" && amountCards.length < 3) {
//         value += 11;
//     }
//     else {
//         value++;
//     }
// }