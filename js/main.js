let chekBtn = document.getElementById("chekBtn");
let text = document.getElementById("textInput");
let resultat = document.getElementById("res");
let resultat1 = document.getElementById("res1");
let cats = document.querySelectorAll(".cats");

const min = 1;
const max = 10;
// const nbr = Math.floor(Math.random() * (max - min)) + min;
// const nbr = function Random() {
//     return Math.floor(Math.random() * (max - min)) + min;
// }
let nbr;


chekBtn.addEventListener("click", () => { 
    nbr = Math.floor(Math.random() * (max - min)) + min;
    resultat1.innerHTML = nbr;
    console.log(nbr);
    if (text.value == nbr) {
        resultat.innerHTML = "Nice!";
        cats.forEach ((cat) => {
            cat.style.display = "flex";
        }); 
    }
    else {
        resultat.innerHTML = "Womp-womp";
        cats.forEach ((cat) => {
            cat.style.display = "none";
        }); 
    }
});