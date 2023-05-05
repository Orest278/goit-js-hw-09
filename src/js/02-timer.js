import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css"
import Notiflix from "notiflix";

const inputEl = document.querySelector(`input#datetime-picker`)
const buttonStart = document.querySelector(`button`);
const dataDays = document.querySelector(`[data-days]`);
const dataHours = document.querySelector(`[data-hours]`);
const dataMinutes = document.querySelector(`[data-minutes]`);
const dataSeconds = document.querySelector(`[data-seconds]`);

buttonStart.disabled = true;
let timeotId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
  
  onClose(selectedDates) {
      if (selectedDates[0] <= options.defaultDate) {
          Notiflix.Notify.failure('Please choose a date in the future');
          buttonStart.disabled = true;
      }
      if (selectedDates[0] >= options.defaultDate) {
          buttonStart.disabled = false
      }
  },
};

flatpickr(inputEl, options);

buttonStart.addEventListener(`click`, onButtonClick);

function onButtonClick() {
  timeotId = setInterval(() => {
          updateTime();
    }, 1000);
    inputEl.disabled = true;
    buttonStart.disabled = true;
};

function roundingDays(value) {
    return String(value).padStart(2, "0");
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = roundingDays(Math.floor(ms / day));
 
  const hours = roundingDays(Math.floor((ms % day) / hour));
  
  const minutes = roundingDays(Math.floor(((ms % day) % hour) / minute));
  
  const seconds = roundingDays(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function updateTime() {
  const currentTime = new Date();
  const selectedTime = new Date(inputEl.value);

  const deltaTime = selectedTime - currentTime;

  if (deltaTime <= 0) {
    clearInterval(timeotId);
    inputEl.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(deltaTime);
  dataDays.textContent = `${days}`;
  dataHours.textContent = `${hours}`;
  dataMinutes.textContent = `${minutes}`;
  dataSeconds.textContent = `${seconds}`;
}