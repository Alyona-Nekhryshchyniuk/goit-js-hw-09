const button = document.querySelector('button');

let form = document.querySelector('form');

let delay;
let id;
let position = 0;

const quantityOfFnCalling = e => {
  e.preventDefault();
  let delayValueInNum = Number(form.delay.value);
  let stepValueInNum = Number(form.step.value);

  let amount = form.amount.value;
  for (let i = delayValueInNum; (i += stepValueInNum); i <= amount) {
    delay = i;
    setTimeout(() => {
      position += 1;
      createPromise({ position, delay })
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delay);
  }
};

form.addEventListener('submit', quantityOfFnCalling);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position: position, delay: delay });
      } else {
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
}
