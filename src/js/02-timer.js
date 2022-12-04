import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

// const startBut = document.querySelector('[data-start]');

const input = document.querySelector('#datetime-picker');
const air = new AirDatepicker('#datetime-picker', {
  timepicker: true,
  onSelect(formattedDate) {
    console.log(formattedDate.date);
  },
});
let z = air.onSelect;
console.log(z);
console.log(new Date());
// input.addEventListener('focus', () => {
//   console.log(air.viewDate);
// });
// const setTimer = () => {
//   const subtrahend = Date.now();

//   return setInterval(() => {
//     const minuend = Date.now();
//     console.log(getTimeComponents(minuend - subtrahend));
//   }, 1000);
// };

// startBut.addEventListener('click', setTimer);

function getTimeComponents(time) {
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((time % (1000 * 60)) / 1000);
  return { hours, mins, secs };
}
