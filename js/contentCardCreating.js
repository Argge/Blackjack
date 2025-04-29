import { defineNumberPlayer, defineNumberDealer, defineSymbol, defineColor } from "./defineFunctions.js";

// let numberCard = null;
// let symbolCard = null;
// let symbolMain = null;
// let colorCard = null;

// Functions for creating cards content
function cardPlayer() {
    const number = test(defineNumberPlayer);
    const symbol = test(defineSymbol);
    const color = defineColor(symbol);
    cardCreatingElements("content", number, symbol, color);
}

function cardDealer() {
    const number = test(defineNumberDealer);
    const symbol = test(defineSymbol);
    const color = defineColor(symbol);
    cardCreatingElements("contentDealer", number, symbol, color);
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

    const { numberEl: numberCardTop, symbolEl: symbolCardTop } = createNumSym(number, symbol);
    numberCardTop.classList.add(color);
    symbolCardTop.classList.add(color);
    topDiv.appendChild(numberCardTop);
    topDiv.appendChild(symbolCardTop);


    // Creating main symbol
    const symbolMain = createSymMain(symbol);
    symbolMain.classList.add(color);
    cardDiv.appendChild(symbolMain);


    // Creating number & symbol on bottom side of card
    let bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom");
    cardDiv.appendChild(bottomDiv);

    const { numberEl: numberCardBottom, symbolEl: symbolCardBottom } = createNumSym(number, symbol);
    numberCardBottom.classList.add(color);
    symbolCardBottom.classList.add(color);
    bottomDiv.appendChild(numberCardBottom);
    bottomDiv.appendChild(symbolCardBottom);

}

function cardBackSideCreate(id) {
    let contentDiv = document.getElementById(id);
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("cardBack");
    contentDiv.appendChild(cardDiv);
}

function createNumSym(number, symbol) {
    const numberCard = document.createElement("p");
    numberCard.classList.add("number");
    numberCard.textContent = number;

    const symbolCard = document.createElement("p");
    symbolCard.classList.add("symbol");
    symbolCard.textContent = symbol;

    return {
        numberEl: numberCard,
        symbolEl: symbolCard
    };
}

function createSymMain(symbol) {
    const symbolMain = document.createElement("p");
    symbolMain.classList.add("symbolMain");
    symbolMain.textContent = symbol;

    return symbolMain;
}

function test(func) {
    return func();
}

export { cardPlayer, cardDealer, cardBackSideCreate }

