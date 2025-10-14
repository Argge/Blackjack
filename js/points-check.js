import { player, dealer } from "./entities.js";
import { messegeWindow } from "./messege-window.js";
import { game } from "./main.js";

let betCounter = document.getElementById("betCounter");
let playerCounter = document.getElementById("playerCounter");

function reset(messege) {
    messegeWindow.open(messege);
    player.points = 0;
    player.cards = [];
    dealer.points = 0;
    dealer.cards = [];
    game.isOver = true;
    game.bet = 0;
    betCounter.textContent = "BET: 0$";
}

function resetWin(messege) {
    player.wins++;
    player.bank += (game.bet * 2);
    playerCounter.textContent = `${player.bank}$`;
    reset(messege);
}

function bust(messege) {
    player.bank += game.bet;
    playerCounter.textContent = `${player.bank}$`;
    reset(messege);
}

function dealerPointsCheck() {
    if(dealer.points > player.points && dealer.points <= 21) reset("Loose!");
    else if (dealer.points < player.points && dealer.points >= 17) resetWin("Won!");
    else if (dealer.points === player.points && dealer.points >= 17) bust("Bust!");
    else if (dealer.points > 21) resetWin("Won!");
}

function playerPointsCheck() {
    if (player.points === 21) resetWin("Won!");
    else if (player.points > 21) reset("Loose!");
}

export { dealerPointsCheck, playerPointsCheck, bust}