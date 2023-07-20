var mario = document.querySelector(".mario");
var pipe = document.querySelector(".pipe");
var clouds = document.querySelector(".clouds");
var gameOverText = document.querySelector(".div-game-over");
var startGameText = document.querySelector(".start-game");
function jump() {
    mario.classList.add("jump");
    setTimeout(function () {
        mario.classList.remove("jump");
    }, 500);
}
function init() {
    setTimeout(function () {
        document.addEventListener("click", jump);
        document.addEventListener("keydown", jumpKey);
    }, 10);
    function jumpKey(e) {
        if (e.key == " ") {
            jump();
        }
    }
    startGameText.style.display = "none";
    var loop = setInterval(function () {
        mario.style.bottom = "0";
        var pipePosition = pipe.offsetLeft;
        clouds.style.animation = "clouds-animation linear 14s infinite";
        pipe.style.animation = "pipe-animation 1.7s linear infinite";
        var marioPosition = +window
            .getComputedStyle(mario)
            .bottom.replace("px", "");
        var cloudPosition = clouds.offsetLeft;
        if (pipePosition <= 95 && pipePosition > 0 && marioPosition <= 78) {
            console.log("game over");
            document.removeEventListener("click", jump);
            document.removeEventListener("keydown", jumpKey);
            clouds.style.animation = "none";
            clouds.style.left = "".concat(cloudPosition, "px");
            pipe.style.animation = "none";
            pipe.style.left = "".concat(pipePosition, "px");
            mario.style.bottom = "".concat(marioPosition, "px");
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
