// Acess DOM nodes
const startButton = document.querySelector('.start');
const counter = document.querySelector('.round-counter');
const restartButton = document.querySelector('.restart');
const topLeft = document.querySelector('.top-left');
const topRight = document.querySelector('.top-right');
const bottomRight = document.querySelector('.bottom-right');
const bottomLeft = document.querySelector('.bottom-left');
const grid = Array.from(document.querySelectorAll('.grid'))
const score = document.querySelector('.score')
const endInfo = document.querySelector('.end-info');
const finalScore = document.querySelector(".final-score")

// Create control variables
let isGameOn = false;
let canClick = false;
// Start a sequence with a initial panel (will change)
let sequence = [randomPanel()];
// Keep track of what the user is guessing (will not change)
let sequenceToGuess = [...sequence];
// Keep track of the game score
let currentScore = 1;

// Start the game
function startGame() {
  startButton.style.display = "none";
  counter.style.display = "inline";
  restartButton.style.display = "inline";
  endInfo.style.display = "none";
  grid.forEach(element => {
    element.style.cursor = "pointer";
  })
  // Reseting the score
  score.innerText = 1;
  // Start the game
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
    element.style.cursor = "default";
  })
  isGameOn = false;
  canClick = false;
  // Resetting the sequence
  sequence = [randomPanel()];
  sequenceToGuess = [...sequence];
  // Show the result for the user
  endInfo.style.display = "inline";
  finalScore.innerText = (currentScore - 1);
  // Reseting the score
  currentScore = 1;
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
    }, 500)
  });
};

// Start toggling the grid colors
const flashingStart = async () => {
  canClick = false;
  for (const panel of sequence) {
    // Stop flashing if the user click restart
    if (isGameOn) {
      await flash(panel);
    }
  }
  canClick = true;
}

// Check if you click on the right pannel
const panelClicked = panelClicked => {
  if (!canClick || !isGameOn) return;
  const expectedPanel = sequenceToGuess.shift();
  if (expectedPanel === panelClicked.target) {
    if (sequenceToGuess.length === 0) {
      // Incrementing the score
      currentScore += 1;
      // Replacing the score in the ui
      score.innerText = currentScore;
      // start new round
      sequence.push(randomPanel());
      sequenceToGuess = [...sequence];
      flashingStart();
    }
  } else {
    // end game
    restartGame();
  }
}
// Event listener
grid.forEach(element => {
  element.addEventListener('click', panelClicked);
})
