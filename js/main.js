let randomBtn = document.getElementById("randomBtn");

randomBtn.addEventListener("click", () => {

    let contentDiv = document.getElementById("content");
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    contentDiv.appendChild(cardDiv);

    let topDiv = document.createElement("div");
    topDiv.classList.add("top");
    cardDiv.appendChild(topDiv);

    let number1 = document.createElement("p");
    number1.classList.add("number", "colorRed");
    number1.textContent = "A";
    let symbol1 = document.createElement("p")
    symbol1.classList.add("symbol", "colorRed")
    symbol1.textContent = "♦";
    topDiv.appendChild(number1);
    topDiv.appendChild(symbol1);


    let symbolMain = document.createElement("p");
    symbolMain.classList.add("symbolMain", "colorRed");
    numberMain.textContent = "A";
    cardDiv.appendChild(symbolMain);

    let bottomDiv = document.createElement("div");
    bottomDiv.classList.add("bottom");
    cardDiv.appendChild(bottomDiv);

    let number2 = document.createElement("p");
    number2.classList.add("number", "colorRed");
    number2.textContent = "A"
    let symbol2 = document.createElement("p")
    symbol2.classList.add("symbol", "colorRed")
    symbol2.textContent = "♦";
    bottomDiv.appendChild(number2);
    bottomDiv.appendChild(symbol2);
    // cardContentGenerate();
});




function createNumSym() {
    let number = document.createElement("p");
    number.classList.add("number", "colorRed");
    number.textContent = "A";

    let symbol = document.createElement("p")
    symbol.classList.add("symbol", "colorRed")
    symbol.textContent = "A";
}

function createSymMain() {
    let symbolMain = document.createElement("p");
    symbolMain.classList.add("symbolMain", "colorRed");
    numberMain.textContent = "A";
}

function cardContentGenerate() {

    let number = document.getElementsByClassName("number");
    let symbol = document.getElementsByClassName("symbol");
    let symbolMain = document.getElementsByClassName("symbolMain");

    let NumCard = randomNumber();
    let ColCard = randomColor();
    let SymCard = randomSymbol();

    if (NumCard <= 10) {
        cardNum(NumCard);
        if (SymCard === 1) {
            SymbolTo("♠", symbol);
            SymbolTo("♠", symbolMain);
        }
        else if (SymCard === 2) {
            SymbolTo("♥", symbol);
            SymbolTo("♥", symbolMain);
        }
        else if (SymCard === 3) {
            SymbolTo("♣", symbol);
            SymbolTo("♣", symbolMain);
        }
        else {
            SymbolTo("♦", symbol);
            SymbolTo("♦", symbolMain);
        }
    }
    else if (NumCard === 11) {
        cardNum("J");
        SymbolsJQKA("J", symbolMain);
    }
    else if (NumCard === 12) {
        cardNum("Q");
        SymbolsJQKA("Q", symbolMain);
    }
    else if (NumCard === 13) {
        cardNum("K");
        SymbolsJQKA("K", symbolMain);
    }
    else {
        cardNum("A");
        SymbolsJQKA("A", symbolMain);
    }

    if (ColCard === 1) {
        ColorTo("colorRed", "colorBlack", number);
        ColorTo("colorRed", "colorBlack", symbol);
        ColorTo("colorRed", "colorBlack", symbolMain);
    }
    else {
        ColorTo("colorBlack", "colorRed", number);
        ColorTo("colorBlack", "colorRed", symbol);
        ColorTo("colorBlack", "colorRed", symbolMain);
    }
}

// Functions for generating content of card
function cardNum(symbol) {
    for (let i = 0; i < number.length; i++) {
        number[i].textContent = symbol;
    }
}

function randomNumber() {
    let indexNum = Math.floor((Math.random()*(14-1)) + 1);
    console.log(indexNum);
    // let text = indexNum.toString();
    return indexNum;
}

function randomSymbol() {
    let indexSym = Math.floor((Math.random()*(4-1)) + 1);
    console.log(indexSym);
    // let text = indexSym.toString();
    return indexSym;
}

function randomColor() {
    let indexCol = Math.floor((Math.random()*(3-1)) + 1);
    console.log(indexCol);
    // let text = indexCol.toString();
    return indexCol;
}

function ColorTo(color1, color2, object) {
    for (let i = 0; i < object.length; i++) {
        object[i].classList.remove(color1);
        object[i].classList.add(color2);
    } 
}

function SymbolTo(symbol, object) {
    for (let i = 0; i < object.length; i++) {
        object[i].textContent = symbol;
    }
}

function SymbolsJQKA(symbol, object) {
     for (let i = 0; i < object.length; i++) {
        object[i].textContent = symbol;
    }
}