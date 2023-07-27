document.addEventListener("DOMContentLoaded", function() {
  const gameContainer = document.getElementById("game");

  const COLORS = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "red",
    "blue",
    "green",
    "orange",
    "purple"
  ];

  const startButton = document.getElementById("newGame");
  gameContainer.style.display = "none"; // hide the game before the button is clicked
  let flipped = [] // which cards are currently flipped up face up

  // here is a helper function to shuffle an array
  // it returns the same array with values shuffled
  // it is based on an algorithm called Fisher Yates if you want to research more
  function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }

  // this function loops over the array of colors
  // it creates a new div and gives it a class with the value of the color
  // it also adds an event listener for a click for each card
  function createDivsForColors(colorArray) {
    gameContainer.style.display = "inline-block";// unhide the game
    for (let color of colorArray) {
      // create a new div
      const newDiv = document.createElement("div");

      // give it a class attribute for the value we are looping over
      newDiv.classList.add(color);

      // call a function handleCardClick when a div is clicked on
      newDiv.addEventListener("click", handleCardClick);

      // append the div to the element with an id of game
      gameContainer.append(newDiv);
    }
  }

  // TODO: Implement this function!
  function handleCardClick(event) {
    // you can use event.target to see which element was clicked
    console.log("you just clicked", event.target);
    let e = event.target;
    console.log(e);
    if (flipped.length == 0) {
      flipped.push(e);
      e.style.backgroundColor = e.className;
    }
    else if (flipped.length == 1) {
      if (flipped[0] !== e){
        flipped.push(e);
        e.style.backgroundColor = e.className; // Clicking a card should change the background color to be the color of the class it has
        console.log(flipped);
        if (flipped.length == 2){ // Users should only be able to change at most two cards at a time.
          setTimeout(function(){ 
            if (flipped[0].className !== flipped[1].className) { // keep flipped face up
              flipped.forEach (function(card) {  // flip cards face down
                card.style.backgroundColor = "white";
              });
            }
            flipped = []; // reset most recently 2 clicked cards
          },1000); // stay turned over for at least 1 second before they hide the color again.
        }
      }
    }
  }

  function startGame(){
    console.log("works");
    let shuffledColors = shuffle(COLORS);
    gameContainer.innerHTML = "";
    createDivsForColors(shuffledColors);
    gameContainer.style.display = "inline-block";
  }

  // when the DOM loads
  document.addEventListener("click", function(e){
    if (e.target.id === "newGame"){
      startGame();
    }
  }); // add start button listener
});
