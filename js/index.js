let canvas = document.getElementById("viewPort");
let button = document.getElementById("reset");
let height = "650";
let width = "1400";
const number = 100;
let ballInfo;
let balls = [];
let animation;
canvas.setAttribute("height", height);
canvas.setAttribute("width", width);
canvas.style.border = "1px solid black";
let context = canvas.getContext("2d");
let loop = function () {
  animation = window.requestAnimationFrame(draw);
};
function setup() {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);
  for (let i = 0; i < number; i++) {
    balls.push(new Ball(generateElement()));
  }
  loop();
}
function draw() {
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      balls[i].collides(balls[j]);
    }
  }

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].show();
  }
  loop();
}

setup();
button.addEventListener("click", function () {
  window.cancelAnimationFrame(animation);
  balls = [];
  setup();
});
canvas.addEventListener("click", function (e) {
  const audio = new Audio("./sounds/sound.mp3");
  audio.play();
  for (let i = balls.length - 1; i >= 0; i--) {
    let dist = distance(balls[i].x, balls[i].y, e.clientX, e.clientY);
    if (dist < balls[i].radius) {
      balls.splice(i, 1);
    }
  }
});
