// Arrays
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// initialize variables
var checkStart = true;
var level = 1;



// check if game has started
$(document).keypress(function() {
    if (checkStart) {
    
        checkStart = false;
        nextSequence();
        // $("h1").fadeOut().fadeIn().text("୨⎯ Level 0 ⎯୧");
        $("h1").text("୨⎯ Level 0 ⎯୧");
        $("#endMessage").text(" ");

    }
});

// check user pattern
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


// check user progress
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over! (◡︵◡)");
        $("#endMessage").text("Press Any Key to Restart! (unless you're Yair, there's no hope for you :( ) ");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

// get random card
function nextSequence() {
    userClickedPattern = []; // reset user pattern
    level++; // another level
    $("#level-title").text("୨⎯ Level " + level + " ⎯୧");

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    // button flashes
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

// make sound
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

// animate button click
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    // wait for a bit
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

// restart the game
function startOver() {
    level = 0;
    gamePattern = [];
    checkStart = true; // Reset the checkStart to true for the next game
}


// Bazinga!
