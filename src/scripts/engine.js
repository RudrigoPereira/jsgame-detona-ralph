const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    menuLivesText: document.querySelector(".menu-lives h2"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    lives: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  },
};

function restartGame() {
  state.values.result = 0;
  state.values.curretTime = 60;
  state.values.lives = 3;
  state.view.score.textContent = state.values.result;
  state.view.timeLeft.textContent = state.values.curretTime;
  updateLivesText();

  state.actions.timerId = setInterval(randomSquare, 1000);
  state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function countDown() {
  state.view.timeLeft.textContent = state.values.curretTime;
  state.values.curretTime--;
  // state.view.timeLeft.textContent = state.values.curretTime;

  if (state.values.curretTime <= 0) {
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Game Over! O seu resultado foi: " + state.values.result);
    restartGame();
  }

  if (state.values.lives <= 0) {
    alert("Game Over! O seu resultado foi: " + state.values.result);
    restartGame();
  }
}

function updateLivesText() {
  state.view.menuLivesText.textContent = `x${state.values.lives}`;
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        square.classList.add("wrong-click");
        setTimeout(() => {
          square.classList.remove("wrong-click");
        }, 250); 
        state.values.lives--;
        updateLivesText();
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
}

initialize();
