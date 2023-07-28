import Notiflix from "notiflix";

const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        res({ position, delay })
      } else {
        rej({ position, delay })
      }
    }, delay)
  })
  
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget.elements;
  let delayInput = Number(delay.value);
  let amountVal = 0;
  let position = 0; 
  const intervalId = setInterval(() => {
    if (amountVal === Number(amount.value)) {
      clearInterval(intervalId);
      return;
    }
    amountVal += 1;
    position += 1;
    createPromise(position, delayInput)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayInput += Number(step.value);
  }, 0); 
}