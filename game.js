userClickedPattern = [];
gamePattern = [];
var level = 0;
var started = false;

buttonColors = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];
  var selectedButton = $("." + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  level++;
  $("h1").text("Level " + level);
}

//Detects when any button is clicked and triggers a handler function to grab ID of clicked button
$("div .btn").click(function(){
    var userChosenColor = this.id;
    playSound(userChosenColor);
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  switch (name) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    default: console.log(name);
  }
}

function animatePress(currentColor) {
  var currentButton = $("div .btn" + "." + currentColor);
  $(currentButton).addClass("pressed");

  setTimeout(function() {
    currentButton.removeClass("pressed");
  }, 100);
}

$(document).keypress(function(){
  if(started === false) {
    started = true;
    $("h1").text("Level 1");
    nextSequence();
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    wrongAnswer();
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function wrongAnswer() {
  var wrong = new Audio("sounds/wrong.mp3");
  wrong.play();
  $("body").addClass("game-over");

  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
}

function startOver() {
  $(document).keypress(function(){
    level = 0;
    gamePattern = [];
    started = false;
    nextSequence();
    $("h1").text("Level 1");
  });
}
