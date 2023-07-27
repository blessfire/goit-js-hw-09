const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', handleBtnStart);
btnStop.addEventListener('click', handleBtnStop);

let timeOutId = null;

function handleBtnStart() {
    timeOutId = setInterval(() => {
        btnStart.disabled = true;
        btnStop.disabled = false;
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function handleBtnStop() {
    clearInterval(timeOutId);
    btnStop.disabled = true;
    btnStart.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}