import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const body = document.querySelector('body');
const daySpan = document.querySelector('[data-days]');
const hourSpan = document.querySelector('[data-hours]');
const minSpan = document.querySelector('[data-minutes]');
const secSpan = document.querySelector('[data-seconds]');
const startBut = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const input = document.querySelector('input');
const timerLabel = document.createElement('p');

body.style.backgroundSize = '100%';
body.style.backgroundImage =
  "url('https://krot.info/uploads/posts/2022-01/1642571168_3-krot-info-p-bomba-art-8.jpg')";

timerLabel.style.color = 'red';
timerLabel.style.paddingLeft = '18px';
timerLabel.style.fontSize = '38px';
timerLabel.textContent = 'russia will be blown up in';

timer.prepend(timerLabel);
timer.style.marginLeft = '900px';
timer.style.marginTop = '290px';

startBut.style.backgroundColor = 'red';
startBut.style.color = 'white';
startBut.style.borderRadius = '15%';
startBut.style.padding = '7px';
startBut.style.fontSize = '18px';
startBut.style.border = 'none';

input.style.display = 'inlineBlock';
input.style.width = '340px';
input.style.fontSize = '24px';
input.style.marginLeft = '50px';
input.style.marginRight = '10px';

let spanArray = [daySpan, hourSpan, minSpan, secSpan];

for (const span of spanArray) {
  span.style.fontWeight = 'bold';
  span.style.color = 'dodgerblue';
  span.style.fontSize = '46px';
}

let id;
let startTimerValue;

const updateSpanValues = newMsec => {
  let { days, hours, mins, secs } = getTimeComponents(newMsec);

  daySpan.textContent = days;
  hourSpan.textContent = hours;
  minSpan.textContent = mins;
  secSpan.textContent = secs;
};

const calendar = new AirDatepicker('#datetime-picker', {
  timepicker: true,
  onSelect(formattedDate) {
    calendar.hide();
    clearInterval(id);
    if (startBut.hasAttribute('disabled')) {
      startBut.removeAttribute('disabled');
      startBut.style.backgroundColor = 'red';
    }
    let currentTime = new Date();
    let chosen_Date_Time = formattedDate.date;
    startTimerValue = chosen_Date_Time - currentTime;
    if (startTimerValue < 0) {
      toastr.error('Please choose date in the future');
    } else {
      updateSpanValues(startTimerValue);
    }
  },
});

const startTimerOnClick = () => {
  startBut.setAttribute('disabled', '');
  startBut.style.backgroundColor = 'lightcoral';
  id = setInterval(() => {
    console.log(startTimerValue);
    startTimerValue -= 1000;

    if (startTimerValue < 0) {
      clearInterval(id);
    }
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
