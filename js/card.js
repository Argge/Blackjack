import { randomNumber } from "./random-number.js";

class Card {
    constructor(land) {
        this.land = land
    }
    value = 0;

    render = () => {
        const cardParametrs = defineCardParametrs();

        this.value = cardParametrs.value;

        cardRender(this.land, cardParametrs.symbol, cardParametrs.symbolMain, cardParametrs.suit, cardParametrs.color);
    }

    none = () => {
        const contentDiv = document.getElementById("dealerLand");
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("cardBack");
        contentDiv.appendChild(cardDiv);
    }
}

function defineCardParametrs() {
    let value = randomNumber(2, 14);
    let suit = randomNumber(1, 4);

    let cardParametrs = {
        value: 0,
        symbol: "",
        symbolMain: "",
        suit: "",
        color: ""
    }

    const valuesMap = {
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        11: 10,
        12: 10,
        13: 10,
        14: 11
    }

    cardParametrs.value = valuesMap[value];

    const symbolsMap = {
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "J",
        12: "Q",
        13: "K",
        14: "A"
    }

    cardParametrs.symbol = symbolsMap[value];

    const suitMap = {
        1: "♦",
        2: "♥",
        3: "♣",
        4: "♠"
    }

    cardParametrs.suit = suitMap[suit];

    if (value === 11) cardParametrs.symbolMain = "J";
    else if (value === 12) cardParametrs.symbolMain = "Q";
    else if (value === 13) cardParametrs.symbolMain = "K";
    else cardParametrs.symbolMain = suitMap[suit];

    if (suit === 1 || suit === 2) cardParametrs.color = "colorRed";
    else cardParametrs.color = "colorBlack";

    return cardParametrs;
}

function cardRender(land, symbol, symbolMain, suit, color) {
    const landName = document.getElementById(land);

    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    landName.appendChild(cardDiv);

    // Top
    const topDiv = document.createElement("div");
    topDiv.classList.add("top");
    cardDiv.appendChild(topDiv);

    const symbolCardTop = document.createElement("p");
    symbolCardTop.textContent = symbol;
    symbolCardTop.classList.add(color);
    topDiv.appendChild(symbolCardTop);

    const suitCardTop = document.createElement("p");
    suitCardTop.textContent = suit;
    suitCardTop.classList.add("suit");
    suitCardTop.classList.add(color);
    topDiv.appendChild(suitCardTop);


    // Midle 
    const symbolCardMain = document.createElement("p");
    symbolCardMain.textContent = symbolMain;
    symbolCardMain.classList.add("symbolMain");
    symbolCardMain.classList.add(color);
    cardDiv.appendChild(symbolCardMain);


    // Bottom
    const bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom");
    cardDiv.appendChild(bottomDiv);

    const symbolCardBottom = document.createElement("p");
    symbolCardBottom.textContent = symbol;
    symbolCardBottom.classList.add(color);
    bottomDiv.appendChild(symbolCardBottom);

    const suitCardBottom = document.createElement("p");
    suitCardBottom.textContent = suit;
    suitCardBottom.classList.add("suit");
    suitCardBottom.classList.add(color);
    bottomDiv.appendChild(suitCardBottom);
}

export { Card }