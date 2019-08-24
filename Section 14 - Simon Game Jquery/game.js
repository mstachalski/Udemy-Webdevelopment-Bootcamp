let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let gameStarted = false;
let seqPlaying = false;

$(document).keydown(function (e) { 
    if(!gameStarted){
        gameStarted = true;
        nextSequence();
    }
});

//Create next pattern entry
function nextSequence() {
    seqPlaying = true;
    let randomNumber = Math.floor(Math.random() * 4)
    level++;

    $("h1").html("Observe The Sequence");

    //Push color to the pattern array
    gamePattern.push(buttonColors[randomNumber]);

    let promise = Promise.resolve();
    //For each button in the pattern play the button
    gamePattern.forEach(color => {
        promise = promise.then(()=> {
            animatePress(color);
            playSound(color);
            return new Promise((resolve) => {
                setTimeout(resolve,1000);
            });
        });
    });

    promise.then(()=> {
        console.log("Animation finished");
        seqPlaying = false; 
        $("h1").html("Level " + level + "<br />Repeat The Sequence!");      
    });

    //Reset user answers
    userClickedPattern = [];
}

//User Clicks a button
$(".btn").click(function (e) {
    if(!seqPlaying && gameStarted) {
        e.preventDefault();
        let userChosenColor = e.target.id;
        userClickedPattern.push(userChosenColor);
    
        animatePress(userChosenColor);
        playSound(userChosenColor);
    
        checkAnswer(userClickedPattern.length-1);
    }
});

function playSound(soundFile) {
    let sound = new Audio("sounds/" + soundFile + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).toggleClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).toggleClass("pressed");

    }, 100);
}

function checkAnswer(progressionIndex)  {
    if(userClickedPattern[progressionIndex] == gamePattern[progressionIndex]){
        console.log("success");     
        if (progressionIndex == gamePattern.length-1) {
            seqPlaying = true;
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }   
    } else {
        $("body").css("backgroundColor", "red");
        setTimeout(() => {
            $("body").css("backgroundColor", "#011F3F");
        }, 100);
        gameOver();          
    }
}

function gameOver() {
    level = 0;
    gameStarted = false;
    userClickedPattern = [];
    gamePattern = [];

    $("h1").html("Game Over, Press A Button To Restart!");    
}
