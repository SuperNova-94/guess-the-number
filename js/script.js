// Variable to store the list of guesses 

let guesses = [];

// Variable for store the correct random number 
let correctNumber = getRandomNumber(); // getRandomNumber returns whole number --> correctNumber
console.log('The correct number is:\n' + correctNumber);

window.onload = function() {
  document.getElementById("number-submit").addEventListener("click", playGame);
  document.getElementById("restart-game").addEventListener("click", initGame);
    
}

// AUDIO
const won = new Audio("./audio/congratz.mp3");
const won2 = new Audio("./audio/MJ.mp3");

const error = new Audio("./audio/error.mp3");
const errorAbove = new Audio("./audio/error-above.mp3");
const errorBelow = new Audio("./audio/error-below.mp3");

const restart = new Audio("./audio/Kaching.mp3");
/**
 * Functionality for playing the whole game
 */
function playGame(){
  let numberGuess = document.getElementById('number-guess').value;
  displayResult(numberGuess);
  saveGuessHistory(numberGuess);
  displayHistory();
}

//  * Show the result for if the guess it too high, too low, or correct

function displayResult(numberGuess) { 
  if (numberGuess >  correctNumber) {  
    setTimeout(function(){
        errorAbove.play();
    }, 930)
    error.play();
    showNumberAbove();
    document.getElementById('number-guess').value = "";
    document.getElementById('number-guess').placeholder="Guess Again!"; 
  } else if (numberGuess < correctNumber) {
    setTimeout(function(){
        errorBelow.play();
    }, 930)
    error.play();
    showNumberBelow();
    document.getElementById('number-guess').value = "";
    document.getElementById('number-guess').placeholder="Guess Again!"; 
  } else {
    setTimeout(function(){
        won.play();
    }, 3100);
    won2.volume = 0.2;
    won2.play();
    showYouWon(); 
    document.getElementById('number-guess').value = "";
    document.getElementById('number-guess').placeholder="Hurray!!!"; 
    makeItRain();
  }
}


//  * Initialize a new game by resetting all values and content on the page

function initGame(){
  // Reseted the correctNumber
  // Reseted the resultsDisplay     
  // Reseted the guesses array
  // Reseted the guess history display
  restart.play();
  document.getElementById('number-guess').placeholder="What's your guess?";
  correctNumber = getRandomNumber();
  document.getElementById("result").innerHTML = "";
  guesses = [];
  displayHistory();
  console.log('The correct number is:\n' + correctNumber);
  $( ".confetti" ).remove();
}

/**
 * Reset the HTML content for guess history
 */
function resetResultContent(){
  document.getElementById("result").innerHTML = "";
}

/**
 * Return a random number between 1 and 100
 * Implementing: Math.random functiom
 */
function getRandomNumber(){
  let randomNumber = Math.random();
  let wholeNumber = Math.floor(randomNumber * 100) + 1; /*
  *NOTE(S)* Math.floor used to get the whole number (no decimals)                                                                    
  ** +1 was added as just randomNumber * 100 only give out a number from 0 To 99 (MAX)                                                             
  ** Thus, adding the allows it to generate out any number                                     
     from 0 To 100                      
                                                       */
  return wholeNumber;
}

/**
 * Save guess history 
 */

function saveGuessHistory(guess) {
  // *CODE GOES BELOW HERE *
  guesses.push(guess);

}

/**
 * Display guess history to user
 * HTML TO USE:
 * <ul class='list-group'>
 *  <li class='list-group-item'>You guessed {number}</li
 * </ul>
 * Made use of while loop and string concatentation to create a list of guesses
 */
function displayHistory() {
  let index = guesses.length - 1; 
  let list = "<ul class='list-group'>";
  while(index >= 0) { 
    list += "<li class='list-group-item'>" + "You guessed: " + guesses[index] + "</li>"
    index--;
  }
  list += '</ul>'
  document.getElementById("history").innerHTML = list;
}



/**
 * Retrieve the dialog based on if the guess is wrong or correct 
 */

function getDialog(dialogType, text){
  let dialog;
  switch(dialogType){
    case "warning":
      dialog = "<div class='alert alert-warning' role='alert'>"
      break;
    case "won":
      dialog = "<div class='alert alert-success' role='alert'>"
      break;
  }
  dialog += text;
  dialog += "</div>"
  return dialog;
}

function showYouWon(){
  const text = "Awesome job, you got it!"
  /**
   * Retrieved the dialog using the getDialog() function
   * and save it to variable called dialog
   */
  let dialog = getDialog('won', text); 
  document.getElementById("result").innerHTML = dialog;
}

function showNumberAbove(){
  const text = "Your guess is too high!"
  /**
   * Retrieved the dialog using the getDialog() function
   * and save it to variable called dialog
   */
  let dialog = getDialog('warning', text); 

  document.getElementById("result").innerHTML = dialog;
}

function showNumberBelow(){
  const text = "Your guess is too low!"
  /**
   * Retrieved the dialog using the getDialog() function
   * and save it to variable called dialog
   */
  let dialog = getDialog('warning', text);

  document.getElementById("result").innerHTML = dialog;
}