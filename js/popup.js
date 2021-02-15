import {OFFERS_COUNT, addOffers} from './data.js';
import { getRandomNumber, numDecline } from './util.js';

const INDEX = getRandomNumber(0, OFFERS_COUNT);

const mapCanvas = document.querySelector('.map__canvas');

const templatePopup = document.querySelector('#card').content.querySelector('.popup');

const similarOffers = addOffers();

similarOffers.forEach(() => {
  const offerElement = templatePopup.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = similarOffers[INDEX].offer.title;
  offerElement.querySelector('.popup__text--address').textContent = similarOffers[INDEX].offer.adress;
  offerElement.querySelector('.popup__text--price').textContent = similarOffers[INDEX].offer.price + '₽/ночь';
  offerElement.querySelector('.popup__type').textContent = similarOffers[INDEX].offer.type;
  offerElement.querySelector('.popup__text--capacity').innerHTML = similarOffers[0].offer.rooms + ' ' + numDecline((similarOffers[0].offer.rooms), ['комната', 'комнаты', 'комнат']) + ' ' + similarOffers[0].offer.guests + ' ' + numDecline((similarOffers[0].offer.guests), ['гость', 'гостя', 'гостей']);
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + similarOffers[INDEX].offer.checkin + ', ' + 'выезд до ' + similarOffers[INDEX].offer.checkout;
  offerElement.querySelector('.popup__features').textContent = similarOffers[INDEX].offer.features;
  offerElement.querySelector('.popup__description').textContent = similarOffers[INDEX].offer.description;
  offerElement.querySelector('.popup__photo').src = similarOffers[INDEX].offer.photos;
  offerElement.querySelector('.popup__avatar').src = similarOffers[INDEX].author.avatar;

  mapCanvas.appendChild(offerElement);
});

export {similarOffers};
