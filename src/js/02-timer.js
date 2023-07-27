import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

Notiflix.Notify.init({
    position: 'left-top',
  clickToClose: true,
  fontSize: '20px',
});

const btnStart = document.querySelector('[data-start]');
const daysLeft = document.querySelector('[data-days]');
const hoursLeft = document.querySelector('[data-hours]');
const minutesLeft = document.querySelector('[data-minutes]');
const secondsLeft = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] - Date.now() < 0) {
            Notiflix.Notify.failure('Please choose a date in the future');
        }
        if (selectedDates[0] - Date.now() > 0) {
            btnStart.disabled = false;
            selectedDate = selectedDates[0];
        }
    },
};

const { enableTime, time_24hr, defaultDate, minuteIncrement, onClose } = options;

const flatpickrResult = flatpickr('#datetime-picker', { enableTime, time_24hr, defaultDate, minuteIncrement, onClose, });
const timer = {
    intervalId: null, deltaTime() {
        return selectedDate - Date.now();
    },
    startTimer() {
        btnStart.disabled = true;
        this.intervalId = setInterval(() => {
            const deltaTime = this.deltaTime();
            if (deltaTime <= 1000) {
                this.stopTimer();
                Notiflix.Notify.success('That time hase come', {
                    position: "left-top",
                    timeout: 13000,
                    fontSize: '20px',
                });
            }
            const { days, hours, minutes, seconds } = convertMs(deltaTime);

            daysLeft.textContent = days;
            hoursLeft.textContent = hours;
            minutesLeft.textContent = minutes;
            secondsLeft.textContent = seconds;
        }, 1000);
    },
    stopTimer() { clearInterval(this.intervalId); },
};

btnStart.addEventListener('click', timer.startTimer.bind(timer));

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function convertTime({ days, hours, minutes, seconds }) {
daysLeft.textContent = addLeadingZero(days);
  hoursLeft.textContent = addLeadingZero(hours);
  minutesLeft.textContent = addLeadingZero(minutes);
  secondsLeft.textContent = addLeadingZero(seconds);
}
// console.log(convertMs(2000)); {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); {days: 0, hours: 6 minutes: 42, seconds: 20}