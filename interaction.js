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
let canClick = false;
// Start a sequence with a initial panel (will change)
const sequence = [randomPanel()];
// Keep track of what the user is guessing
let guessSequence = [...sequence];

// Start the game
function startGame() {
  startButton.style.display = "none";
  counter.style.display = "inline";
  restartButton.style.display = "inline";
  grid.forEach(element => {
    element.style.cursor = "pointer";
  })
  isGameOn = true;
  flashingStart();
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

// Create random panels
function randomPanel() {
  return grid[parseInt(Math.random() * grid.length)];
}

// Use promisses to wrap timeout
const flash = panel => {
  return new Promise(resolve => {
    panel.className += ' white';
    // Toggle the color
    setTimeout(() => {
      panel.className = panel.className.replace(
        ' white',
        ''
      );
      // Handle when the same pannel is triggered more than once in a row
      setTimeout(() => {
        resolve();
      }, 250);
    }, 1000)
  });
};

// Check if you click on the right pannel
function panelCheck(panelClicked) {
  if (canClick) {
    const expectedPanel = guessSequence.shift();
    if (expectedPanel === panelClicked) {
      // Check if the user clicked right
      if (guessSequence.length === 0) {
        // Start new round
        sequence.push(randomPanel());
        guessSequence = [...sequence];
        flashingStart();
      }
    } else {
      // End game
      alert('Game over');
    }
  }
}

// Start toggling the grid colors
const flashingStart = async () => {
  canClick = false;
  for (const panel of sequence) {
    await flash(panel);
  }
  canClick = true;
}

flashingStart();


// Event handler when click in the grid
function clickPanel(event) {
  return event.target;
}

// Event listener
grid.forEach(element => {
  element.addEventListener('click', clickPanel);
})
