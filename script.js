const audioUrl = [
  "https://brilliant-empanada-89207d.netlify.app",
  "/music/dl/gta/5/radio/",
  "nonstop-pop.mp3"
].join("");

const audio = new Audio(audioUrl);
audio.volume = 0.7;

document.addEventListener("contextmenu", e => e.preventDefault());

const button = document.getElementById("playPause");
let started = false;

button.onclick = () => {
  if (!started) {
    audio.currentTime = Math.random() * audio.duration || 0;
    audio.play();
    button.textContent = "⏸ PAUSE";
    started = true;
    return;
  }
  if (audio.paused) {
    audio.play();
    button.textContent = "⏸ PAUSE";
  } else {
    audio.pause();
    button.textContent = "▶ PLAY";
  }
};

const knob = document.getElementById("volumeKnob");
const container = knob.parentElement;

const min = -135;
const max = 135;

function updateVolume(angle) {
  angle = Math.max(min, Math.min(max, angle));
  knob.style.transform = `rotate(${angle}deg)`;
  audio.volume = (angle - min) / (max - min);
}

function handleMove(x, y) {
  const r = container.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  let angle = Math.atan2(y - cy, x - cx) * 180 / Math.PI + 90;
  updateVolume(angle);
}

let dragging = false;

knob.addEventListener("mousedown", () => dragging = true);
document.addEventListener("mouseup", () => dragging = false);
document.addEventListener("mousemove", e => { if (dragging) handleMove(e.clientX, e.clientY); });

knob.addEventListener("touchstart", e => { dragging = true; e.preventDefault(); });
document.addEventListener("touchend", () => dragging = false);
document.addEventListener("touchmove", e => { if (dragging) { const t = e.touches[0]; handleMove(t.clientX, t.clientY); } });

updateVolume(min + audio.volume * (max - min));
