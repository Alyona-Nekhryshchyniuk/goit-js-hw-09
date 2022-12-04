import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minSpan = document.querySelector('[data-minutes]');
const secSpan = document.querySelector('[data-seconds]');
// const input = document.querySelector('#datetime-picker');
const startBut = document.querySelector('[data-start]');

let startTimerValue;

const air = new AirDatepicker('#datetime-picker', {
  timepicker: true,
  onSelect(formattedDate) {
    let currentTime = new Date();
    let chosen_Date_Time = formattedDate.date;
    startTimerValue = chosen_Date_Time - currentTime;
    console.log(startTimerValue);
    let chosenDateObj = getTimeComponents(startTimerValue);
    console.log(chosenDateObj);
    daySpan.textContent = chosenDateObj.days;
    hourSpan.textContent = chosenDateObj.hours;
    minSpan.textContent = chosenDateObj.mins;
    secSpan.textContent = chosenDateObj.secs;
  },
});

// input.addEventListener('focus', () => {
//   console.log(air.viewDate);
// });
const startTimerOnClick = () => {
  const subtrahend = Date.now();

  return setInterval(() => {
    const minuend = Date.now();
    console.log(getTimeComponents(minuend - subtrahend));
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
