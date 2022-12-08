import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

let form = document.querySelector('form');

let delay = 0;
let id = 0;
let position = 0;
let pause = 0;

const preventDefaultOnSubmit = e => {
  e.preventDefault();
  Notify.success('Ssuccess');

  Notify.failure('Ffailure');

  Notify.warning('Wwarning');

  const fn = () => {
    let step = form.step.value;

    if (id === 0) {
      delay = form.delay.value;
      pause = delay;
    } else {
      delay = Number(delay) + Number(step);
      pause = Number(step);
    }

    id = setTimeout(() => {
      position += 1;

      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          if (position < form.amount.value) {
            fn();
          }
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          delay = Number(delay);
          if (position < form.amount.value) {
            fn();
          }
        });
    }, pause);
  };
  fn();
};

form.addEventListener('submit', preventDefaultOnSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, pause);
  });
}
