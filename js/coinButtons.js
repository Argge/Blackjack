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

export { coinBtn5, coinBtn25, coinBtn50, coinBtn100, coinBtn500 }