const screens = document.querySelectorAll(".screen");
const chooseInsectBtns = document.querySelectorAll(".choose-insect-btn");
const startBtn = document.getElementById("start-btn");

const gameContainer = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");

let seconds = 0;
let score = 0;
let selectedInsect = {};

startBtn.addEventListener("click", () => {
  screens[0].classList.add("up");
  console.log(chooseInsectBtns);
});

const increaseTime = () => {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
};

const startGame = () => {
  setInterval(increaseTime, 1000);
};

chooseInsectBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selectedInsect = { src, alt };
    screens[1].classList.add("up");

    setTimeout(createInsect, 1000);
    startGame();
  });
});

const getRandomLocation = () => {
  const width = window.innerWidth;
  const heigth = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (heigth - 200) + 100;
  return { x, y };
};

const addInsects = () => {
  setTimeout(createInsect, 3000);
  setTimeout(createInsect, 2500);
};

function catchInsect() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addInsects();
}

const createInsect = () => {
  const insect = document.createElement("div");
  insect.classList.add("insect");
  const { x, y } = getRandomLocation();
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;

  insect.innerHTML = `
        <img 
            src="${selectedInsect.src}" 
            alt="${selectedInsect.alt}"
            style="transform: rotate(${Math.random() * 360}deg)"
        />
    `;

  insect.addEventListener("click", catchInsect);
  gameContainer.appendChild(insect);
};

const increaseScore = () => {
  score++;
  if (score > 5) {
    message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score ${score}`;
};

message.addEventListener("click", () => {
  location.reload(true);
  screens[1].classList.remove("up");
});
