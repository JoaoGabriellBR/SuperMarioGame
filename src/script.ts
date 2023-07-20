const mario = document.querySelector(".mario") as HTMLImageElement;
const pipe = document.querySelector(".pipe") as HTMLElement;
const clouds = document.querySelector(".clouds") as HTMLElement;
const gameOverText = document.querySelector(".div-game-over") as HTMLElement;
const startGameText = document.querySelector(".start-game") as HTMLElement;

function jump() {
  mario.classList.add("jump");
  setTimeout(() => {
    mario.classList.remove("jump");
  }, 500);
}

function init() {
  setTimeout(() => {
    document.addEventListener("click", jump);
    document.addEventListener("keydown", jumpKey);
  }, 10);

  function jumpKey(e: KeyboardEvent) {
    if (e.key == " ") {
      jump();
    }
  }

  startGameText.style.display = "none";

  const loop = setInterval(() => {
    mario.style.bottom = "0";
    const pipePosition = pipe.offsetLeft;
    clouds.style.animation = "clouds-animation linear 14s infinite";
    pipe.style.animation = "pipe-animation 1.7s linear infinite";
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace("px", "");
    const cloudPosition = clouds.offsetLeft;

    if (pipePosition <= 95 && pipePosition > 0 && marioPosition <= 78) {
      console.log("game over");

      document.removeEventListener("click", jump);
      document.removeEventListener("keydown", jumpKey);

      clouds.style.animation = "none";
      clouds.style.left = `${cloudPosition}px`;

      pipe.style.animation = "none";
      pipe.style.left = `${pipePosition}px`;

      mario.style.bottom = `${marioPosition}px`;

      mario.src = "./src/assets/game-over.png";
      mario.style.width = "70px";
      mario.style.marginLeft = "50px";

      gameOverText.style.display = "flex";

      clearInterval(loop);
    }
  }, 10);
}

function restart() {
  pipe.style.left = "unset";
  clouds.style.left = "unset";
  mario.src = "./src/assets/mario.gif";
  mario.style.width = "140px";
  mario.style.marginLeft = "0";
  gameOverText.style.display = "none";
  init();
}
