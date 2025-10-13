import { player, dealer } from "./entities.js";
import { messegeWindow } from "./messege-window.js";
import { game } from "./main.js";

let betCounter = document.getElementById("betCounter");
let playerCounter = document.getElementById("playerCounter");

function reset(messege) {
    messegeWindow.open(messege);
    player.points = 0;
    player.cards = [];
    player.points = 0;
    dealer.cards = [];
    game.bet = 0;
    betCounter.textContent = "BET: 0$";
}

function resetWin(messege) {
    player.wins++;
    player.bank += (game.bet * 2);
    playerCounter.textContent = `BANK: ${player.bank}$`;
    reset(messege);
}

export function pointsCheck() {
    if (dealer.points < 21) {
        if (player.points === 21) resetWin("Won!");
        else if (player.points > 21) reset("Loose!");
    }
    else if (dealer.points > 21) resetWin("Won!");
    else reset("Loose!");
}