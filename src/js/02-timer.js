import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minSpan = document.querySelector('[data-minutes]');
const secSpan = document.querySelector('[data-seconds]');
const startBut = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

let id;
let startTimerValue;

const timerLabel = document.createElement('p');
timerLabel.classList.add('timerLabel');
timerLabel.textContent = 'russia will be blown up in';
timer.prepend(timerLabel);

const updateSpanValues = newMsec => {
  let { days, hours, mins, secs } = getTimeComponents(newMsec);
  daySpan.textContent = days;
  hourSpan.textContent = hours;
  minSpan.textContent = mins;
  secSpan.textContent = secs;
};

new AirDatepicker('input', {
  timepicker: true,
  onSelect(formattedDate) {
    clearInterval(id);

    startBut.hasAttribute('disabled') && startBut.removeAttribute('disabled');

    startTimerValue = formattedDate.date - new Date();

    startTimerValue < 0
      ? toastr.error('Please choose date in the future')
      : updateSpanValues(startTimerValue);
  },
});

const startTimerOnClick = () => {
  startBut.setAttribute('disabled', '');

  id = setInterval(() => {
    startTimerValue -= 1000;

    startTimerValue < 1200 && clearInterval(id);

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
