import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minSpan = document.querySelector('[data-minutes]');
const secSpan = document.querySelector('[data-seconds]');
const startBut = document.querySelector('[data-start]');
const input = document.querySelector('input');

input.style.display = 'block';
input.style.width = '350px';

let id;
let startTimerValue;

const updateSpanValues = vals => {
  let chosenDateObj = getTimeComponents(vals);
  daySpan.textContent = chosenDateObj.days;
  hourSpan.textContent = chosenDateObj.hours;
  minSpan.textContent = chosenDateObj.mins;
  secSpan.textContent = chosenDateObj.secs;
};

new AirDatepicker('#datetime-picker', {
  timepicker: true,
  position: 'bottom right',
  onSelect(formattedDate) {
    clearInterval(id);
    if (startBut.hasAttribute('disabled')) {
      startBut.removeAttribute('disabled');
    }
    let currentTime = new Date();
    let chosen_Date_Time = formattedDate.date;
    startTimerValue = chosen_Date_Time - currentTime;
    updateSpanValues(startTimerValue);
  },
});

const startTimerOnClick = () => {
  startBut.setAttribute('disabled', '');
  id = setInterval(() => {
    startTimerValue -= 1000;
    updateSpanValues(startTimerValue);
  }, 1000);
};

startBut.addEventListener('click', startTimerOnClick);

function getTimeComponents(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((time % (1000 * 60)) / 1000);
  return { days, hours, mins, secs };
}
