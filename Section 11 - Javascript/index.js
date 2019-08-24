let randomNumber1 = Math.floor(Math.random() * 6) + 1;
let randomNumber2 = Math.floor(Math.random() * 6) + 1;


let dice1 = document.querySelector(".img1");
let dice2 = document.querySelector(".img2");

dice1.src = "images/dice"+randomNumber1+".png";
dice2.src = "images/dice"+randomNumber2+".png";

let winnerText = document.querySelector("h1");

if(randomNumber1 > randomNumber2) {
    winnerText.innerHTML = 'Player 1 Wins!';    
} else if(randomNumber2 > randomNumber1) {
    winnerText.innerHTML = 'Player 2 Wins!';
} else {
    winnerText.innerHTML = 'Draw!';
}