import { player, dealer } from "./entities.js";

const pointsP = document.getElementById("pointsPlayer");
const pointsD = document.getElementById("pointsDealer");

function pointsRender() {
    pointsP.textContent = player.points;
    pointsD.textContent = dealer.points;

    pointsP.style.display = "flex";
    pointsD.style.display = "flex";
}

export { pointsRender }