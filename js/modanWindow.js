import { amountCardsPlayer, amountCardsDealer, playerPoints, dealerPoints, playerA, dealerA, sumPlayerPoints1, sumPlayerPoints2, playerWins,dealerWins, cardsInDeck, playerBank, gameBank, hitBtn  } from "./main.js";

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

export { modalTypeText, modalWinClose, modalWinFinalClose }