import { numberCard, symbolCard, playerPoints, dealerPoints } from "./vars.js";

// Define functions: Number, Symbol, Color
function defineNumberPlayer() {
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

function turnButtons(boolean) {
    for (i = 0; i < buttonsTable.length; i++) {
        buttonsTable[i].disabled = boolean;
    }    
}

// Functions for generating content of card
function randomNumber() {
    let indexNum = Math.floor((Math.random()*(15-2)) + 2);
    return indexNum;
}

function randomSymbol() {
    let indexSym = Math.floor((Math.random()*(5-1)) + 1)
    return indexSym;
}

export { defineNumberPlayer, defineNumberDealer, defineSymbol, defineColor, turnButtons, randomNumber, randomSymbol }