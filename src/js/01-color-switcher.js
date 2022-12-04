const startBut = document.querySelector('[data-start]');
const stopBut = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let id;

// listener on Start
startBut.addEventListener('click', () => {
  id = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBut.setAttribute('disabled', '');
  if (stopBut.hasAttribute('disabled')) stopBut.removeAttribute('disabled');
});

// listener on Stop
stopBut.addEventListener('click', () => {
  clearInterval(id);
  stopBut.setAttribute('disabled', '');
  startBut.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
