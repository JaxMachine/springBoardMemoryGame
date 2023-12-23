const gameContainer = document.getElementById("game");
//const cardScene = document.getElementById("cards");
const gridContainer = document.querySelector(".grid-container");

let firstCard, secondCard;
let lockBoard = false;
let score = 0;

const COLORS = [
  "turquoise",
  "blue",
  "green",
  "orange",
  "purple",
  "turquoise",
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
    const newColorBox = document.createElement("div");
    const newColorBoxBack = document.createElement("div");
    const newColorBoxFront = document.createElement("div");

    newColorBox.setAttribute("data-name", color);
    newColorBox.classList.add("colorBox");
    newColorBoxBack.classList.add("colorBoxBack");

    newColorBoxFront.classList.add("colorBoxFront");
    newColorBoxFront.style.backgroundColor = color;

    newColorBox.appendChild(newColorBoxBack);
    newColorBox.appendChild(newColorBoxFront);

    gridContainer.appendChild(newColorBox);
    //call a function handleCardClick when a div is clicked on
    newColorBox.addEventListener("click", handleCardClick);
  }
}

// TODO: Implement this function!

function handleCardClick() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("clicked");
  this.children[0].classList.add("clicked");
  this.children[1].classList.add("clicked");

  if (!firstCard) {
    firstCard = this;

    return;
  }

  secondCard = this;
  score++;
  document.querySelector(".score").textContent = score;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  console.log(firstCard.dataset.name);
  console.log(secondCard.dataset.name);
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : markWrong();
}

function disableCards() {
  firstCard.removeEventListener("click", handleCardClick);
  secondCard.removeEventListener("click", handleCardClick);

  resetBoard();
}
function markWrong() {
  firstCard.children[1].classList.add("wrong");
  secondCard.children[1].classList.add("wrong");
  setTimeout(() => {
    firstCard.children[1].classList.remove("wrong");
    secondCard.children[1].classList.remove("wrong");
  }, 1000);
  unflipCards();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("clicked");
    secondCard.classList.remove("clicked");
    firstCard.children[0].classList.remove("clicked");
    firstCard.children[1].classList.remove("clicked");
    secondCard.children[0].classList.remove("clicked");
    secondCard.children[1].classList.remove("clicked");
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
