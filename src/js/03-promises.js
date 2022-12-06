const button = document.querySelector('button');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const position = amount.value;
console.log(position);
// const delay
// const firstDelay

const regularPromiseCreation = (position, delay, firstDelay) => {
  setTimeout(createPromise(1, 0), firstDelay);
  for (const i = position; i >= 1; i--) {
    setTimeout(createPromise(position, delay), 1000);
  }
};

button.addEventListener('click', regularPromiseCreation());

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
