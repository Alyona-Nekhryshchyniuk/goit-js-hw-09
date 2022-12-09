import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const form = document.querySelector('form');
let delay;

const showNotification = (position, delay) => {
  setTimeout(() => {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }, delay);
};

const multiplePromiseCreation = e => {
  e.preventDefault();

  const amount = form.amount.value;
  const firstDelay = +form.delay.value;
  const stepDelay = +form.step.value;

  for (let i = 1; i <= amount; i += 1) {
    delay = i === 1 ? firstDelay : +delay + stepDelay;

    showNotification(i, delay);
  }
};

const createPromise = (position, delay) => {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    shouldResolve ? resolve({ position, delay }) : reject({ position, delay });
  });
};
form.addEventListener('submit', multiplePromiseCreation);
