import { defineNumberPlayer, defineNumberDealer, defineSymbol, defineColor, turnButtons } from "./defineFunctions.js";
import { numberCard, symbolCard, symbolMain, amountCardsPlayer, amountCardsDealer, playerPoints, dealerPoints, playerA, dealerA, sumPlayerPoints1, sumPlayerPoints2, playerWins,dealerWins, cardsInDeck, playerBank, gameBank } from "./vars.js";
import { coinBtn5, coinBtn25, coinBtn50, coinBtn100, coinBtn500 } from "./coinButtons.js";

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

hitBtn.addEventListener("click", () => {

    let playerOrDealerWins = false; // if it's false then in result() is choosed playerWins, else it's true - dealerWins 

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
                result("Dealer win");
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
        console.log("Dealer: " + dealerPoints);
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
        gameBank *= 2;
        playerBank += gameBank;
        playerBankCounter.textContent = "Your bank: 0$";
        modalWinClose("You win");
    }
    else if (dealerPoints > 21) {
        gameBank *= 2;
        playerBank += gameBank;
        playerBankCounter.textContent = "Your bank: 0$";
        modalWinClose("You win");
    }
    else {
        modalWinClose("You loose");
        playerBankCounter.textContent = "Your bank: 0$";
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
    console.log("After: " + sumPlayerPoints1);

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

        turnButtons(false);
        splitTurn = false;

        playerPoints = [[],[]];
        dealerPoints = 0;
        sumPlayerPoints1 = 0;
        sumPlayerPoints2 = 0;
        amountCardsPlayer = [];
        amountCardsDealer = [];
        playerA = [[],[]];
        dealerA = [];
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

function result(text) {
    turnButtons(true);

    if (playerOrDealerWins === false) {
        playerWins++;
    }
    else {
        dealerWins++;
    }
    
    if (text === "You win!" || text === "Blackjack!") {
        playerBankCounter.textContent = "Your bank: " + playerBank + "$";
        playerBank += gameBank;
    }
    gameBankCounter.textContent = "Game bank: 0$";

    modalWinClose(text);
}

export { numberCard, symbolCard, playerPoints, dealerPoints }