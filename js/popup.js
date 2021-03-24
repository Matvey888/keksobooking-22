import { TYPES } from './data.js';
import { numDecline } from './util.js';

const ROOMS = ['комната', 'комнаты', 'комнат'];
const GUESTS = ['гость', 'гостя', 'гостей'];

const templatePopup = document.querySelector('#card').content.querySelector('.popup');

const createCard = ({ author, offer }) => {
  const offerElement = templatePopup.cloneNode(true);
  const featureListElement = offerElement.querySelector('.popup__features');
  const photoListElement = offerElement.querySelector('.popup__photos');

  offerElement.querySelector('.popup__avatar').src = author.avatar;
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__description').textContent = offer.description;
  offerElement.querySelector('.popup__text--address').textContent = offer.adress;
  offerElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  offerElement.querySelector('.popup__type').textContent = TYPES[offer.type];
  offerElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} ${numDecline((offer.rooms), ROOMS)} ${offer.guests} ${numDecline((offer.guests), GUESTS)}`;
  offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  featureListElement.innerHTML = '';
  offer.features.forEach((item) =>{
    const feature = document.createElement('li');
    const featureClass = `popup__feature--${item}`;
    feature.classList.add('popup__feature', featureClass);
    featureListElement.appendChild(feature);
  });

  photoListElement.innerHTML = '';
  offer.photos.forEach((item) => {
    const photoElement = templatePopup.querySelector('.popup__photo').cloneNode(true);
    photoElement.src = item;
    photoListElement.appendChild(photoElement);
  });

  return offerElement;
};

export { createCard };
