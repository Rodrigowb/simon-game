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
    element.style.cursor = "pointer";
  })
  isGameOn = true;
  console.log(isGameOn);
  main();
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

// Use promisses to wrap timeout
const flash = panel => {
  return new Promise((resolve, reject) => {
    panel.className += ' white';
    setTimeout(() => {
      panel.className = panel.className.replace(
        ' white',
        ''
      );
      resolve();
    }, 500)
  });
};

// Loop throught the grids
const main = async () => {
  while (isGameOn) {
    for (const panel of grid) {
      await flash(panel);
    }
  }
}
