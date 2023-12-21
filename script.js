const gameContainer = document.getElementById("game");
//const cardScene = document.getElementById("cards");
const gridContainer = document.querySelector(".grid-container");

let firstCard, secondCard;
let lockBoard = false;
let score = 0;

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
  "purple",
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
    // create a new Card
    const newCard = document.createElement("div");
    // const newFront = document.createElement("div");
    // const newBack = document.createElement("div");

    newCard.classList.add("card");
    newCard.setAttribute("data-name", color);

    // newCard.appendChild(newFront);
    // newCard.appendChild(newBack);
    // append the div to the element with an id of cardScene
    gridContainer.appendChild(newCard);
    //call a function handleCardClick when a div is clicked on
    newCard.addEventListener("click", handleCardClick);
  }
}

// TODO: Implement this function!

function handleCardClick(e) {
  if (lockBoard) return;
  if (e.target === firstCard) return;
  e.target.classList.add("flipped");
  e.target.style.backgroundColor = e.target.dataset.name;

  if (!firstCard) {
    firstCard = e.target;
    return;
  }

  secondCard = e.target;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  console.log(firstCard.dataset.name);
  console.log(secondCard.dataset.name);
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    firstCard.style.backgroundColor = "white";
    secondCard.classList.remove("flipped");
    secondCard.style.backgroundColor = "white";
    resetBoard();
  }, 1000);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  let shuffledColors = shuffle(COLORS);
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  createDivsForColors(shuffledColors);
}

// when the DOM loads
createDivsForColors(shuffledColors);
