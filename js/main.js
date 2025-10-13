import { player, dealer } from "./entities.js";
import { messegeWindow } from "./messege-window.js";
import { Card } from "./card.js";
import { pointsCheck } from "./points-check.js";

const hitBtn = document.getElementById("hitBtn");
const standBtn = document.getElementById("standBtn");
const splitBtn = document.getElementById("splitBtn");

const coinsBtn = [
    document.getElementById("coin5"),
    document.getElementById("coin25"),
    document.getElementById("coin50"),
    document.getElementById("coin100"),
    document.getElementById("coin500")
];

let game = {
    bank: 0
}

hitBtn.addEventListener("click", () => {

    if (game.bank === 0) {
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

            player.points += (player.cards[0].value + player.cards[1].value);
            dealer.points += (dealer.cards[0].value + dealer.cards[1].value);

            console.log(`Dealer: ${dealer.points}`);
            console.log(`Player: ${player.points}`);

            if (player.points === 21) {
                player.wins++;
                player.bank += (game.bank * 2.5);

                player.points = 0;
                player.cards = [];

                dealer.points = 0;
                player.cards = [];

                game.bank = 0;

                messegeWindow.open("Blackjack!");
            }
        }
        else if (player.cards.length > 1 && player.cards.length !== 5) {
            player.cards.push(new Card("playerLand"));

            const currentCardIndex = (player.cards.length - 1);
            player.cards[currentCardIndex].render();
            player.points += player.cards[currentCardIndex].value;

            console.log(`Dealer: ${dealer.points}`);
            console.log(`Player: ${player.points}`);

            pointsCheck();
        }
    }

    // if (gameBank === 0) {
    //     hitBtn.disabled = true;
    //     splitBtn.disabled = true;
    //     standBtn.disabled = true;
    //     modalTypeText("Did a bet");
    // }
    // else {
    //     if (amountCardsPlayer.length < 1) {

    //         amountCardsPlayer.push(cardPlayer());
    //         amountCardsPlayer.push(cardPlayer());
    //         amountCardsDealer.push(cardDealer());
    //         amountCardsDealer.push(cardBackSideCreate("contentDealer"));

    //         cardsInDeck -= 2;
    //         deckCardsCounter.textContent = "Cards in deck: " + cardsInDeck;

    //         for(i = 0; i < playerPoints[0].length; i++) {
    //             sumPlayerPoints1 += playerPoints[0][i];
    //         }

    //         for(i = 0; i < dealerPoints[0].length; i++) {
    //             sumDealerPoints += dealerPoints[0][i];
    //         }

    //         // BLACKJACK
    //         if (sumPlayerPoints1 === 21) {
    //             playerOrDealerWins = false;
    //             gameBank *= 2.5;
    //             result("Blackjack!");
    //         }
    //         // DOUBLE A
    //         else if (sumPlayerPoints1 === 22) {
    //             playerOrDealerWins = false;
    //             gameBank *= 2.5;
    //             result("Blackjack!");            
    //         }
    //         else {}
    //     }
    //     else {
    //         const content = document.getElementById("content");
    //         const contentDealer = document.getElementById("contentDealer")
            
    //         cardsInDeck--;
    //         let deckCardsCounter = document.getElementById("deckCardsCounter");
    //         deckCardsCounter.textContent = "Cards in deck: " + cardsInDeck;

    //         amountCardsPlayer.push(cardPlayer());
    //         sumFunction();
            
    //         // DEFAULT WIN
    //         if (sumPlayerPoints1 === 21) {
    //             gameBank *= 2;
    //             playerOrDealerWins = false;
    //             result("You win!");
    //         }
    //         // DEFAULT LOOSE
    //         else if (sumPlayerPoints1 > 21) {
    //             playerOrDealerWins = true;
    //             result("Dealer win");
    //         }
    //         else {}

    //         // IF SPLIT MODE IS TURN ON
    //         if (splitTurn === true) {
    //             amountCardsPlayer.push(cardPlayer());
    //             amountCardsPlayer.push(cardPlayer());
    //             playerPoints[1].push(playerPoints[0].pop());

    //             sumFunction();

    //             if (sumPlayerPoints1 > 21 || sumPlayerPoints2 > 21) {
    //                 gameBank /= 2;
    //                 gameBankCounter.textContent = "Game bank: " + gameBank + "$";
    //             }
    //             else if (sumPlayerPoints1 > 21 && sumPlayerPoints2 > 21) {
    //                 playerOrDealerWins = true;
    //                 result("Dealer win");
    //             }
    //             else if (sumPlayerPoints1 === 21 && sumPlayerPoints2 === 21) {
    //                 playerOrDealerWins = false;
    //                 gameBank *= 3.5;
    //                 result("You win!");
    //             }
    //             else {
    //                 amountCardsPlayer.push(cardPlayer());
    //             }

    //             // THE END
    //             if (cardsInDeck === 0) {
    //                 if (playerWins > dealerWins) {
    //                     modalWinFinalClose("You win game!");
    //                 }
    //                 else {
    //                     modalWinFinalClose("You loose game!");
    //                 }
    //             }
    //         }
    //     }
    //     console.log("Player: " + sumPlayerPoints1);
    //     console.log("Dealer: " + sumDealerPoints);
    // }
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
        playerOrDealerWins = false;
        gameBank *= 2;
        result("You win");
    }
    else if (dealerPoints > 21) {
        playerOrDealerWins = false;
        gameBank *= 2;
        result("You win");
    }
    else {
        playerOrDealerWins = true;
        result("You loose");
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
coinsBtn[0].addEventListener("click", () => {
    game.bank += 5;
    player.bank -= 5;

    console.log(game.bank);
    console.log(player.bank);
});



function turnButtons() {
    for (i = 0; i < buttonsTable.length; i++) {
        buttonsTable[i].disabled = true;
    }    
}

export { game }