const gameContainer = document.getElementById("game");
const gridContainer = document.querySelector(".grid-container");


const gameName = "Color/Match/Memory";

let firstCard, secondCard;
let lockBoard = false;
let score = 0;

let baseColumCount = 5;
let baseRowCount = 2;

let numberOfBoxes;
let randomColors =[];

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

//const randomColors = generateRandom(numberOfBoxes);



function calculateGrid(numberOfBoxes){
  const gridContainer = document.querySelector(".grid-container");
  let rowCount = numberOfBoxes/baseColumCount * baseRowCount;
  gridContainer.style.setProperty('grid-template-rows','repeat('+rowCount+ ', 140px');
}

//Invertred Color Generated
function invertColor(hex) {
  if (hex.indexOf('#') === 0) {
      hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  // invert color components
  var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
      g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
      b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
  len = len || 2;
  var zeros = new Array(len).join('0');
  return (zeros + str).slice(-len);
}

function generateRandom(number){
  let array=[];
  for(let i =0; i<number/2; i++)
  {
  let randomCode = Math.floor(Math.random()*16777215).toString(16);
  while(randomCode.length !== 6) {
    randomCode = Math.floor(Math.random()*16777215).toString(16);
}
  const randomColor = "#"+ randomCode;
  const invertedColor = invertColor(randomColor);
  //push two copies of the colors to the color array for matching.
  array.push(randomColor);
  array.push(randomColor);
  array.push(invertedColor);
  array.push(invertedColor);
}
return array;
}

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

//let shuffledColors = shuffle(COLORS);
//let shuffledColors = shuffle(randomColors);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  const gridContainer = document.querySelector(".grid-container");
  const gameContainer = document.getElementById("game");
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
  unSelect();
}

function unSelect() {
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
  //let shuffledColors = shuffle(COLORS);
  gameInit();
  // let shuffledColors = shuffle(randomColors);
  // score = 0;
  // document.querySelector(".score").textContent = score;
  // gridContainer.innerHTML = "";
  // createDivsForColors(shuffledColors);
}

function setup(number){
  console.log(number);
  numberOfBoxes = number;
  gameInit(number);
}


function createMenu(){
    // const gameTitle = document.createElement("h1");
    // const gameTitleTextNode = document.createTextNode(gameName);
    // gameTitle.appendChild(gameTitleTextNode);
    // parent.appendChild(gameTitle);
    let gameWrapper = document.querySelector(".wrapper");
    gameWrapper.innerHTML=`<h1>Color/Match/Memory</h1>
    <div class="mainMenu game-board">
    
    <p class="highScore">High Score:</p>
    <div class="actions">
        <button data-boxNumber= "10" onclick="setup(10)">10 Boxes</button>
        <button data-boxNumber= "20" onclick="setup(20)">20 Boxes</button>
        <button data-boxNumber= "30" onclick="setup(30)">30 Boxes</button>
    </div>
</div>`
}
function createGameBoard(){
  let gameWrapper = document.querySelector(".wrapper");
  gameWrapper.innerHTML=      `<h1>Color/Match/Memory</h1>
  <div class="game-board">
  <p>Score: <span class="score"></span></p>
  <div class="grid-container ">
  </div>
  <p></p>
  <div class="actions">
      <button onclick="restart()">Restart</button>
  </div>
  <div class="actions">
  <button data-boxNumber= "10" onclick="setup(10)">10 Boxes</button>
  <button data-boxNumber= "20" onclick="setup(20)">20 Boxes</button>
  <button data-boxNumber= "30" onclick="setup(30)">30 Boxes</button>
</div>`
}

//Seperate the gameInnit functions:
function gameInit(){
createGameBoard();
randomColors = generateRandom(numberOfBoxes);
let shuffledColors = shuffle(randomColors);
//document.querySelector(".score").textContent = score;
calculateGrid(numberOfBoxes);
createDivsForColors(shuffledColors);
}



function menuInit(){
  let gameWrapper = document.querySelector(".wrapper");
  console.log(gameWrapper);
  createMenu();
  //gameInit();
}
//When the Dom Loads
menuInit();
