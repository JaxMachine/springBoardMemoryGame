const gameContainer = document.getElementById("game");
const cardScene = document.getElementById("cards")

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

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
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

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newCard = document.createElement("div");
    const newFront = document.createElement("div");
    const newBack = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newCard.classList.add("card");
    newFront.classList.add("card__face", "card__face--front");
    newBack.classList.add("card__face", "card__face--back");

    //Add text to front
    newFront.innerText="?";

    //add color background to card back
    newBack.style.backgroundColor = color;

    newCard.append(newFront);
    newCard.append(newBack);

    //call a function handleCardClick when a div is clicked on
    newCard.addEventListener("click", handleCardClick);

    // append the div to the element with an id of cardScene
    cardScene.append(newCard);
  }
}



// when the DOM loads
createDivsForColors(shuffledColors);

//creat an array of cards

// TODO: Implement this function!

function handleCardClick(e) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", e.target.classList[0]);
  console.log("you just clicked" + e.target.classList)
  e.target.classList.add('is-flipped');
    
}