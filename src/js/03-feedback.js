import throttle from 'lodash.throttle';
import { saveToLS, loadFromLS, removeFromLS } from './storageHelpers.js';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');

const LS_FEEDBACK_FORM_KEY = 'feedback-form-state';
const getState = () => ({
  email: emailInput.value,
  message: messageTextarea.value,
});

// Функція для збереження стану форми в LS зі зменшеною частотою
const saveStateToLocalStorage = throttle(() => {
  const state = getState();
  saveToLS(LS_FEEDBACK_FORM_KEY, state);
}, 500);

// Функція для завантаження даних форми з LS
const loadStateFromLocalStorage = () => {
  const state = loadFromLS(LS_FEEDBACK_FORM_KEY);
  if (state) {
    emailInput.value = state.email;
    messageTextarea.value = state.message;
  }
};

// Завантаження даних з LS при завантаженні сторінки
window.addEventListener('load', loadStateFromLocalStorage);

// Відстеження події input і збереження даних в LS
feedbackForm.addEventListener('input', ({ target }) => {
  if (target === emailInput || target === messageTextarea) {
    saveStateToLocalStorage();
  }
});

// Очищення LS і виведення даних при сабміті форми
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  const state = getState();
  console.log(state);
  removeFromLS(LS_FEEDBACK_FORM_KEY);
  emailInput.value = '';
  messageTextarea.value = '';
});
