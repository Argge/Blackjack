// import { numberCard, symbolCard, amountCardsPlayer, amountCardsDealer, playerPoints, dealerPoints, playerA, dealerA, sumPlayerPoints1, sumPlayerPoints2, playerWins,dealerWins, cardsInDeck, playerBank, gameBank } from "./vars.js";
import { cardPlayer, cardDealer, cardBackSideCreate } from "./contentCardCreating.js";
import { modalTypeText, modalWinClose, modalWinFinalClose } from "./modanWindow.js";

const hitBtn = document.getElementById("hitBtn");
const standBtn = document.getElementById("standBtn");
const splitBtn = document.getElementById("splitBtn");

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
let dealerPoints = 0;
let playerA = [[],[]];
let dealerA = [];

let sumPlayerPoints1 = 0;
let sumPlayerPoints2 = 0;

let playerWins = 0;
let dealerWins = 0;
let cardsInDeck = 52;
let playerBank = 500;
let gameBank = 0;

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

function turnButtons(boolean) {
    for (i = 0; i < buttonsTable.length; i++) {
        buttonsTable[i].disabled = boolean;
    }    
}

export { buttonsTable, hitBtn, splitBtn, standBtn, numberCard, symbolCard, symbolMain, amountCardsPlayer, amountCardsDealer, playerPoints, dealerPoints, playerA, dealerA, sumPlayerPoints1, sumPlayerPoints2, playerWins,dealerWins, cardsInDeck, playerBank, gameBank }