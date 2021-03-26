const ALERT_SHOW_TIME = 5000;

const Keys = {
  ESCAPE: 'Escape',
  ESC: 'Esc',
};

const getNumDecline = (num, words) => {
  num = Math.abs(num) % 100;
  let num1 = num % 10;
  if (num > 10 && num < 20) {
    return words[2];
  }
  if (num1 > 1 && num1 < 5) {
    return words[1];
  }
  if (num1 === 1) {
    return words[0];
  }
  return words[2];
};

const successPopup = document.querySelector('#success').content;
const successPopupContent = successPopup.querySelector('.success').cloneNode(true);

const templateErr = document.querySelector('#error').content;
const popupError = templateErr.querySelector('.error').cloneNode(true);
const errorButton = popupError.querySelector('.error__button');

const showError = () => {
  document.body.append(popupError);
};

const closePopup = (popup, button) => {
  document.addEventListener('click', () => {
    popup.remove();
  }, {once: true});

  document.addEventListener('keydown', (evt) => {
    if (evt.key === Keys.ESCAPE || evt.key === Keys.ESC) {
      popup.remove();
    }
  }, {once: true});

  if (button) {
    button.addEventListener('click', () => {
      popup.remove();
    }, {once: true});
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (cb, interval) => {
  let lastTimeout = null;

  return (...args) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...args);
    }, interval);
  };
};

export { getNumDecline, showError, successPopupContent, popupError, errorButton, showAlert, debounce, closePopup };
