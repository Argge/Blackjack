import { player, dealer } from "./entities.js";
import { messegeWindow } from "./messege-window.js";
import { Card } from "./card.js";
import { dealerPointsCheck, playerPointsCheck, bust } from "./points-check.js";
import { pointsRender } from "./points-render.js";

const hitBtn = document.getElementById("hitBtn");
const splitBtn = document.getElementById("splitBtn");
const standBtn = document.getElementById("standBtn");
let playerCounter = document.getElementById("playerCounter");
let betCounter = document.getElementById("betCounter");

const coinsBtn = [
    document.getElementById("coin25"),
    document.getElementById("coin50"),
    document.getElementById("coin100"),
    document.getElementById("coin250"),
    document.getElementById("coin500")
];

let game = {
    bet: 0,
    isOver: false
}

hitBtn.addEventListener("click", () => {
    if (game.bet === 0) {
        messegeWindow.open("Did a bet!")
    }
    else {
        if (player.cards.length === 0) {
            player.cards.push(new Card("playerLand"));
            player.cards.push(new Card("playerLand"));
            dealer.cards.push(new Card("dealerLand"));
            dealer.cards.push(new Card("dealerLand"));
            player.cards[0].render();
            player.cards[1].render();
            dealer.cards[0].render();
            dealer.cards[1].none();

            if (player.cards[0].value === 11 && player.cards[1].value === 11) {
                player.cards[0].value = 1;
                player.cards[1].value = 1;
            }

            player.points += (player.cards[0].value + player.cards[1].value);
            dealer.points += dealer.cards[0].value;

            console.log(`Dealer: ${dealer.points}`);
            console.log(`Player: ${player.points}`);

            if (player.points === 21) {
                player.wins++;
                player.bank += (game.bet * 2.5);

                player.points = 0;

                player.cards = [];
                dealer.points = 0;
                dealer.cards = [];
                game.bet = 0;

                messegeWindow.open("Blackjack!");

                playerCounter.textContent = `${player.bank}$`;
                betCounter.textContent = "BET: 0$";
            }
        }
        else if (player.cards.length >= 2 && player.cards.length !== 5) {
            const newCard = new Card("playerLand");
            player.cards.push(newCard);
            newCard.render();
            if (newCard.value === 11) newCard.value = 1;

            const isAceCard = player.cards.find(card => card.value === 11);
            if (isAceCard && player.cards.length >= 2) {
                isAceCard.value = 1;
                player.points -= 10;
                console.log(isAceCard.value);
            }
            player.points += newCard.value;

            console.log(player.cards);
            console.log(`Dealer: ${dealer.points}`);
            console.log(`Player: ${player.points}`);

            setTimeout(() => { playerPointsCheck() }, 100);
        }
        else if (split.isActive === true && split.turn === false) {
            if (player.split1.length !== 5) {
                const newCard = new Card("playerLand");
                player.split1.push(newCard);
                newCard.render();
                if (newCard.value === 11) newCard.value = 1;

                const isAceCard = player.split1.find(card => card.value === 11);
                if (isAceCard && player.split1.length >= 2) {
                    isAceCard.value = 1;
                    player.points -= 10;
                    console.log(isAceCard.value);
                }
                player.points += newCard.value;

                console.log(player.cards);
                console.log(`Dealer: ${dealer.points}`);
                console.log(`Player: ${player.points}`);

                setTimeout(() => { playerPointsCheck() }, 100); 
            }
            else if (split.isActive === true && split.turn === true) {
                const newCard = new Card("playerLand");
                player.split2.push(newCard);
                newCard.render();
                if (newCard.value === 11) newCard.value = 1;

                const isAceCard = player.split2.find(card => card.value === 11);
                if (isAceCard && player.split2.length >= 2) {
                    isAceCard.value = 1;
                    player.points -= 10;
                    console.log(isAceCard.value);
                }
                player.points += newCard.value;

                console.log(player.cards);
                console.log(`Dealer: ${dealer.points}`);
                console.log(`Player: ${player.points}`);

                setTimeout(() => { playerPointsCheck() }, 100);    
            }
        }
        pointsRender();
    }
});

standBtn.addEventListener("click", () => {
    dealer.cards[1].remove();
    dealer.cards.pop();
    dealer.cards.push(new Card("dealerLand"));
    dealer.cards[1].render();

    if (dealer.cards[0].value === 11 && dealer.cards[1].value === 11) {
        dealer.cards[0].value = 1;
        dealer.cards[1].value = 1;
        dealer.points = 1;
    }
    dealer.points += dealer.cards[1].value;

    if (player.points === dealer.points && dealer.points >= 17) {
        bust("Bust!");
    }

    console.log(`Dealer: ${dealer.points}`);
    console.log(`Player: ${player.points}`);
    
    dealerTurn();
    pointsRender();
});

let split = { 
    isActive: false,
    turn: false
}
splitBtn.addEventListener("click", () => {
    if (player.cards[0].value === player.cards[1].value) {
        split.turn = true;
        player.split1.push(player.cards[0]);
        player.split2.push(player.cards[1]);
    }
});

function dealerTurn() {
    if (dealer.points <= 17 && dealer.cards.length !== 5) {
        setTimeout(() => {
            const newCard = new Card("dealerLand");
            dealer.cards.push(newCard);
            newCard.render();
            if (newCard.value === 11) newCard.value = 1;

            const isAceCard = dealer.cards.find(card => card.value === 11);
            if (isAceCard && dealer.cards.length >= 2) {
                isAceCard.value = 1;
                dealer.points -= 10;
                console.log(isAceCard.value);
            }
            dealer.points += newCard.value;

            console.log(dealer.cards);
            console.log(`Dealer: ${dealer.points}`);
            console.log(`Player: ${player.points}`);

            dealerPointsCheck();
            if (game.isOver === false) dealerTurn();
        }, 500);
    }
    else dealerPointsCheck();
}

function bet(value) {
    game.bet += value;
    player.bank -= value;
    playerCounter.textContent = `${player.bank}$`;
    betCounter.textContent = `BET: ${game.bet}$`;

    console.log(game.bet);
    console.log(player.bank);
}

// Coin buttons
coinsBtn[0].addEventListener("click", () => { bet(25) });
coinsBtn[1].addEventListener("click", () => { bet(50) });
coinsBtn[2].addEventListener("click", () => { bet(100) });
coinsBtn[3].addEventListener("click", () => { bet(250) });
coinsBtn[4].addEventListener("click", () => { bet(500) });

export { game }