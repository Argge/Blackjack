import { game } from "./main.js";

export const messegeWindow = {
    open: (messege) => {
        let buttons = document.querySelectorAll(".mainBtn, .coinBtn");
        Array.from(buttons).forEach(button => button.disabled = true);

        const uiDiv = document.getElementById("ui");
        
        const windowDiv = document.createElement("div");
        windowDiv.id = "modalWin";
        uiDiv.appendChild(windowDiv);

        const paragraph = document.createElement("p");
        paragraph.textContent = messege;
        windowDiv.appendChild(paragraph);

        const contineBtn = document.createElement("button");
        contineBtn.id = "resetBtn";
        contineBtn.textContent = "Contine";
        windowDiv.appendChild(contineBtn);

        contineBtn.addEventListener("click", () => {
            const dealerLand = document.getElementById("dealerLand");
            const playerLand = document.getElementById("playerLand");
            const pointsP = document.getElementById("pointsPlayer");
            const pointsD = document.getElementById("pointsDealer");

            const uiDiv = document.getElementById("ui");
            const windowDiv = document.getElementById("modalWin");
            uiDiv.removeChild(windowDiv);

            dealerLand.innerHTML = "";
            playerLand.innerHTML = "";
            pointsP.style.display = "none";
            pointsD.style.display = "none";
            game.isOver = false;
            Array.from(buttons).forEach(button => button.disabled = false);
        });
    }
}