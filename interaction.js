console.log('Im live')
// Acess DOM nodes
const startButton = document.querySelector('.start');
const counter = document.querySelector('.round-counter');
const restartButton = document.querySelector('.restart');
const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomRight = document.querySelector('.bottom-right');
const bottomLeft = document.querySelector('.bottom-left');
const grid = Array.from(document.querySelectorAll('.grid'))
// Create control variables
let isGameOn = false;

// Start the game
function startGame() {
  startButton.style.display = "none";
  counter.style.display = "inline";
  restartButton.style.display = "inline";
  grid.forEach(element => {
    element.classList.add('white');
    element.style.cursor = "pointer";
  })
  isGameOn = true;
  // toggleColor();
};
startButton.addEventListener('click', startGame);

// Restart the game
function restartGame() {
  startButton.style.display = "inline";
  counter.style.display = "none";
  restartButton.style.display = "none";
  grid.forEach(element => {
    element.classList.remove('white');
  })
  isGameOn = false;
}
restartButton.addEventListener('click', restartGame);

// Generate random numbers
function randomInt() {
  randomNumber = Math.floor(Math.random() * grid.length)
  return randomNumber;
};

// Creating a sleep function
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

//Generate random numbers and color the grid
const toggleColor = async () => {
  for (let i = 0; i < 5; i++) {
    await sleep(2);
    randIndex = randomInt();
    grid[randIndex].classList.remove('white');
    await sleep(2);
    grid[randIndex].classList.add('white');
  }
}
// Use set interval
