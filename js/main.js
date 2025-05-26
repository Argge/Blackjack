const hitBtn = document.getElementById("hitBtn");
const standBtn = document.getElementById("standBtn");
const splitBtn = document.getElementById("splitBtn");

const coinBtn1 = document.getElementById("coin1");
const coinBtn5 = document.getElementById("coin5");
const coinBtn25 = document.getElementById("coin25");
const coinBtn50 = document.getElementById("coin50");
const coinBtn100 = document.getElementById("coin100");
const coinBtn500 = document.getElementById("coin500");

const buttonsTable = document.getElementsByTagName("button");

let playerBankCounter = document.getElementById("playerBankCounter");
let gameBankCounter = document.getElementById("gameBankCounter");

let amountCardsPlayer = [];
let amountCardsDealer = [];

let playerPoints = [[],[]];
let dealerPoints = [];
let playerA = [[],[]];
let dealerA = [];

let sumPlayerPoints1 = 0;
let sumPlayerPoints2 = 0;
let sumDealerPoints = 0;

let playerWins = 0;
let dealerWins = 0;
let cardsInDeck = 52;
let playerBank = 500;
let gameBank = 0;

let playerOrDealerWins = false; // if it's false then in result() is choosed playerWins, else it's true - dealerWins 

hitBtn.addEventListener("click", () => {

    if (gameBank === 0) {
        hitBtn.disabled = true;
        splitBtn.disabled = true;
        standBtn.disabled = true;
        modalTypeText("Did a bet");
    }
    else {
        if (amountCardsPlayer.length < 1) {

            amountCardsPlayer.push(cardPlayer());
            amountCardsPlayer.push(cardPlayer());
            amountCardsDealer.push(cardDealer());
            amountCardsDealer.push(cardBackSideCreate("contentDealer"));

            cardsInDeck -= 2;
            deckCardsCounter.textContent = "Cards in deck: " + cardsInDeck;

            for(i = 0; i < playerPoints[0].length; i++) {
                sumPlayerPoints1 += playerPoints[0][i];
            }

            for(i = 0; i < dealerPoints[0].length; i++) {
                sumDealerPoints += dealerPoints[0][i];
            }

            // BLACKJACK
            if (sumPlayerPoints1 === 21) {
                playerOrDealerWins = false;
                gameBank *= 2.5;
                result("Blackjack!");
            }
            // DOUBLE A
            else if (sumPlayerPoints1 === 22) {
                playerOrDealerWins = false;
                gameBank *= 2.5;
                result("Blackjack!");            
            }
            else {}
        }
        else {
            const content = document.getElementById("content");
            const contentDealer = document.getElementById("contentDealer")
            
            cardsInDeck--;
            let deckCardsCounter = document.getElementById("deckCardsCounter");
            deckCardsCounter.textContent = "Cards in deck: " + cardsInDeck;

            amountCardsPlayer.push(cardPlayer());
            sumFunction();
            
            // DEFAULT WIN
            if (sumPlayerPoints1 === 21) {
                gameBank *= 2;
                playerOrDealerWins = false;
                result("You win!");
            }
            // DEFAULT LOOSE
            else if (sumPlayerPoints1 > 21) {
                playerOrDealerWins = true;
                result("Dealer win");
            }
            else {}

            // IF SPLIT MODE IS TURN ON
            if (splitTurn === true) {
                amountCardsPlayer.push(cardPlayer());
                amountCardsPlayer.push(cardPlayer());
                playerPoints[1].push(playerPoints[0].pop());

                sumFunction();

                if (sumPlayerPoints1 > 21 || sumPlayerPoints2 > 21) {
                    gameBank /= 2;
                    gameBankCounter.textContent = "Game bank: " + gameBank + "$";
                }
                else if (sumPlayerPoints1 > 21 && sumPlayerPoints2 > 21) {
                    playerOrDealerWins = true;
                    result("Dealer win");
                }
                else if (sumPlayerPoints1 === 21 && sumPlayerPoints2 === 21) {
                    playerOrDealerWins = false;
                    gameBank *= 3.5;
                    result("You win!");
                }
                else {
                    amountCardsPlayer.push(cardPlayer());
                }

                // THE END
                if (cardsInDeck === 0) {
                    if (playerWins > dealerWins) {
                        modalWinFinalClose("You win game!");
                    }
                    else {
                        modalWinFinalClose("You loose game!");
                    }
                }
            }
        }
        console.log("Player: " + sumPlayerPoints1);
        console.log("Dealer: " + sumDealerPoints);
    }
});

standBtn.addEventListener("click", () => {
    const contentDealer = document.getElementById("contentDealer");
    contentDealer.lastChild.remove();
    amountCardsDealer.push(cardDealer());

    if ((dealerA[0] && dealerA[1] === "A") && (playerA[0][0] && playerA[0][1] !== "A")) {
        modalWinClose("You loose!"); 
    }
    else if ((dealerA[0] && dealerA[1] === "A") && (playerA[0][0] && playerA[0][1] === "A")) {
        modalWinClose("Draw");
    }
    else {}

    if (dealerPoints < 17) {
        amountCardsDealer.push(cardDealer());
    }

    if (sumPlayerPoints1 > dealerPoints || sumPlayerPoints1 > dealerPoints && sumPlayerPoints2 > dealerPoints) {
        playerOrDealerWins = false;
        gameBank *= 2;
        result("You win");
    }
    else if (dealerPoints > 21) {
        playerOrDealerWins = false;
        gameBank *= 2;
        result("You win");
    }
    else {
        playerOrDealerWins = true;
        result("You loose");
    }

    console.log("Dealer: " + dealerPoints);
});

let splitTurn = false;
splitBtn.addEventListener("click", () => {
    if (playerA[0][0] === playerA[0][1]) {
        playerA[1].push(playerA[0].pop());
        sumPlayerPoints1 /= 2;
        sumPlayerPoints2 += sumPlayerPoints1;
        
        playerPoints[1].push(playerPoints[0].pop());    
    }  
    splitTurn = true;
    if (splitTurn === true) {
        splitBtn.disabled = true;
    }
    else {
        splitBtn.disabled = false;
    }
});

// Coin buttons
coinBtn5.addEventListener("click", () => {
    coinButtonLogic(5);
});

coinBtn25.addEventListener("click", () => {
    coinButtonLogic(25);
});

coinBtn50.addEventListener("click", () => {
    coinButtonLogic(50);
});

coinBtn100.addEventListener("click", () => {
    coinButtonLogic(100);
});

coinBtn500.addEventListener("click", () => {
    coinButtonLogic(500);
});


function sumFunction() {
    let asd1 = 0;
    let asd2 = 0;
    if (splitTurn === true) {
        asd1 = playerPoints[0].pop();
        playerPoints[0].push(asd1);
        sumPlayerPoints1 += asd1;
        asd1 = 0

        asd2 = playerPoints[1].pop();
        playerPoints[1].push(asd2);
        sumPlayerPoints2 += asd2;
        asd2 = 0;
    }
    else {
        asd1 = playerPoints[0].pop();
        playerPoints[0].push(asd1);
        sumPlayerPoints1 += asd1;
        asd1 = 0
    }
}

function coinButtonLogic(value) {
    if (playerBank >= value) {
        playerBank -= value;
        gameBank += value;
        playerBankCounter.textContent = "Your bank: " + playerBank + "$";
        gameBankCounter.textContent = "Game bank: " + gameBank + "$";
    }
    else {
        modalTypeText("You need more money!")
    }
}

function result(text) {
    turnButtons();

    if (playerOrDealerWins === false) {
        playerWins++;
        playerBank += gameBank;
    }
    else if (playerOrDealerWins === true) {
        dealerWins++;
    }
    
    playerBankCounter.textContent = "Your bank: " + playerBank + "$";
    gameBankCounter.textContent = "Game bank: 0$";

    modalWinClose(text);
}

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

function modalWinClose(text) {
    createModalWin(text);
    console.log("After: " + playerPoints);
    playerPoints = [[],[]];
    dealerPoints = [];
    
    const resetBtn = document.getElementById("resetBtn");
    const modalWin = document.getElementById("modalWin");
    const playerWinsCounter = document.getElementById("playerWinsCounter");
    const dealerWinsCounter = document.getElementById("dealerWinsCounter");

    resetBtn.addEventListener("click", () => {
        dealerWinsCounter.textContent = "Dealer wins: " + dealerWins;
        playerWinsCounter.textContent = "Your wins: " + playerWins;
        content.innerHTML = "";
        contentDealer.innerHTML = "";
        modalWin.remove();
        modalGuiWin.remove();
        amountCardsPlayer = [];
        amountCardsDealer = [];
        playerA = [[],[]];
        dealerA = [];
        gameBank = 0;
        sumPlayerPoints1 = 0;
        sumPlayerPoints2 = 0;
        sumDealerPoints = 0;
        for (i = 0; i < buttonsTable.length; i++) {
            buttonsTable[i].disabled = false;
        }
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
                amountCardsPlayer = [];
            });
}


// Functions for creating something
function cardPlayer() {
    cardCreatingElements("content", defineNumberPlayer(), defineSymbol(), defineColor());
}

function cardDealer() {
    cardCreatingElements("contentDealer", defineNumberDealer(), defineSymbol(), defineColor());
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
    // console.log(indexNum);
    return indexNum;
}

function randomSymbol() {
    let indexSym = Math.floor((Math.random()*(5-1)) + 1);
    // console.log(indexSym);
    return indexSym;
}

function randomColor() {
    let indexCol = Math.floor((Math.random()*(3-1)) + 1);
    // console.log(indexCol);
    return indexCol;
}

// Define functions: Number, Symbol, Color
function defineNumberPlayer() {
    let NumCard = randomNumber();
    let numberCard = null;

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
        playerPoints[0].push(NumCard);
    }
    else if (NumCard === 11 || NumCard === 12 || NumCard === 13) {
        playerPoints[0].push(10);
    }
    else if (NumCard === 14 && amountCardsPlayer.length < 3) {
        playerPoints[0].push(11);
    }
    else {
        playerPoints[0].push(1);
    }
    console.log(playerPoints);
    playerA[0].push(numberCard);

    return numberCard;
}

function defineNumberDealer() {
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
        dealerPoints += NumCard;
    }
    else if (NumCard === 11 || NumCard === 12 || NumCard === 13) {
        dealerPoints += 10;
    }
    else if (NumCard === 14 && amountCardsDealer.length < 3) {
        dealerPoints += 11;
    }
    else {
        dealerPoints++;
    }
    console.log(dealerPoints);
    dealerA.push(numberCard);

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

function turnButtons() {
    for (i = 0; i < buttonsTable.length; i++) {
        buttonsTable[i].disabled = true;
    }    
}