const ALERT_SHOW_TIME = 5000;

const getRandomNumber = (min, max, floatNum = 0) => {
  if (max <= min || (min < 0 || max < 0)) {
    return -1;
  }

  return floatNum === 0 ? Math.floor(Math.random() * (max - min + 1)) + min : +((Math.random() * (max - min) + min).toFixed(floatNum));
};

const getRandomArrayElelement = (elements) => {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const numDecline = (num, words) => {
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
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 27) {
      popup.remove();
    }
  });

  if (button) {
    button.addEventListener('click', () => {
      popup.remove();
    });
  }
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

closePopup(popupError, errorButton);
closePopup(successPopupContent);

export { getRandomNumber, getRandomArrayElelement, shuffleArray, numDecline, showError, successPopupContent, showAlert };
