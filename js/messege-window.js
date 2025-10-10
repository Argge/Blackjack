export const messegeWindow = {
    openClose: (messege) => {
        function open (messege) {
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
        }

        function close () {
            const uiDiv = document.getElementById("ui");
            const windowDiv = document.getElementById("modalWin")
            uiDiv.removeChild(windowDiv)
        }
    }
}