const button = document.querySelector('button');

let form = document.querySelector('form');

// let position = 1;
let delay;
let id;

const quantityOfFnCalling = e => {
  e.preventDefault();
  console.log('до цикла фор');
  for (let i = 1; (i += 1); i = form.amount.value) {
    console.log('внутри цикла фор');
    id = setInterval(() => {
      if (i === 1) {
        delay = form.delay.value;
      } else {
        delay = form.step.value;
      }
      // console.log(position);
      createPromise(i, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delay);
    if (i === form.amount.value) {
      clearInterval(id);
    }
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
// else {
//   position = setTimeout(() => {
//     if (shouldResolve) {
//       resolve();
//     } else {
//       reject();
//     }
//   }, step);
// }
