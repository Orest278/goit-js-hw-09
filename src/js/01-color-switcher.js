const startBtb = document.querySelector(`[data-start]`);
const stopBtn = document.querySelector(`[data-stop]`);

let intervalId = null;
startBtb.addEventListener(`click`, startBtnClick);
stopBtn.addEventListener(`click`, stopBtnClick);

function randomColor() {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
};

function startBtnClick() {
    if (!intervalId) {
        intervalId = setInterval(randomColor, 1000);
        startBtb.disabled = true;
    }    
};

function stopBtnClick() {
    clearInterval(intervalId);
    intervalId = null;
    startBtb.disabled = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}