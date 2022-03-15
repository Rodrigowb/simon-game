console.log('Im live')
// Acess DOM nodes
const startButton = document.querySelector('.start');
const counter = document.querySelector('.round-counter');
const resetButton = document.querySelector('.restart');
const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomRight = document.querySelector('.bottom-right');
const bottomLeft = document.querySelector('.bottom-left');
const grid = Array.from(document.querySelectorAll('.grid'))
// Start the game
// Remove the start button
// Insert the counter
// Insert the reset button
// Transform all the grids in white background
function startGame() {
  startButton.style.display = "none";
  counter.style.display = "inline";
  resetButton.style.display = "inline";
  grid.forEach(element => {
    element.style.background = "white";
  })
}

startButton.addEventListener('click', startGame);