
let numOfDrums = document.querySelectorAll(".drum").length;

function playAudio(buttonClass){    
    switch (buttonClass) {
        case 'w':
            let tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;

        case 'a':
            let tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;

        case 's':
            let tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;

        case 'd':
            let tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;

        case 'j':
            let snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;

        case 'k':
            let crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;

        case 'l':
            let kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;

        default:
            break;
    }

    buttonAnimation(buttonClass);
}

document.addEventListener("keydown", (event) => {
    playAudio(event.key);
    
})

for (let i = 0; i < numOfDrums; i++) {
    let instrument = document.querySelectorAll(".drum")[i]
    let instrumentHTML = instrument.innerHTML;

    instrument.addEventListener("click", () => {
        playAudio(instrumentHTML);        
    });
};

function buttonAnimation(key) {
    console.log("derp");
    
    let pressedInstrument = document.querySelector("."+key);
    pressedInstrument.classList.toggle("pressed");

    setTimeout(() => {
        pressedInstrument.classList.toggle("pressed");
    }, 100);
}



