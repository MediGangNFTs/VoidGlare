
const eye = document.getElementById("void-eye");
const eyeCore = document.querySelector(".eye-core");
const eyelid = document.querySelector(".eye-lid");
const player = document.getElementById("player");
const scoreDisplay = document.getElementById("score");

let eyeX = window.innerWidth / 2;
let eyeY = window.innerHeight / 2;
let targetX = eyeX;
let targetY = eyeY;
let score = 0;

// Eye idle float
function floatEye() {
  const time = Date.now() / 1000;
  eyeX = window.innerWidth / 2 + Math.sin(time) * 50;
  eyeY = window.innerHeight / 2 + Math.cos(time) * 30;
  eye.style.left = eyeX - 40 + "px";
  eye.style.top = eyeY - 40 + "px";
}

// Blinking
function blink() {
  eyelid.classList.add("blink");
  setTimeout(() => eyelid.classList.remove("blink"), 300);
  setTimeout(blink, 3000 + Math.random() * 3000);
}

// Track player
document.addEventListener("mousemove", e => {
  player.style.left = e.clientX - 10 + "px";
  player.style.top = e.clientY - 10 + "px";
  updateEyeDirection(e.clientX, e.clientY);
});

// Touch move
document.addEventListener("touchmove", e => {
  if (e.touches.length > 0) {
    const t = e.touches[0];
    player.style.left = t.clientX - 10 + "px";
    player.style.top = t.clientY - 10 + "px";
    updateEyeDirection(t.clientX, t.clientY);
  }
});

function updateEyeDirection(x, y) {
  const dx = x - eyeX;
  const dy = y - eyeY;
  const angle = Math.atan2(dy, dx);
  const offset = 20;
  eyeCore.style.left = 30 + Math.cos(angle) * offset + "px";
  eyeCore.style.top = 30 + Math.sin(angle) * offset + "px";
}

// Score count
setInterval(() => {
  score++;
  scoreDisplay.textContent = score;
}, 1000);

// Game loop
function animate() {
  floatEye();
  requestAnimationFrame(animate);
}

animate();
blink();
