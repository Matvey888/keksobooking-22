import { TYPES } from './data.js';
import { numDecline } from './util.js';

const ROOMS = ['комната', 'комнаты', 'комнат'];
const GUESTS = ['гость', 'гостя', 'гостей'];

const templatePopup = document.querySelector('#card').content.querySelector('.popup');

const renderImages = (container, sources) => {
  let popupPhoto = container.querySelector('.popup__photo');
  container.innerHTML = '';
  const fragmentPhoto = document.createDocumentFragment();
  sources.forEach((source) => {
    const newPhoto = popupPhoto.cloneNode(true);
    newPhoto.src = source;
    fragmentPhoto.appendChild(newPhoto);
  });
  return fragmentPhoto;
};

const renderFeatures = (features, container) => {
  let list = container.querySelectorAll('li');
  list.forEach((item) => {
    if (features.indexOf(item.classList[1].replace('popup__feature--', '')) === -1) {
      item.remove();
    }
  });
};

const createCard = ({ author, offer }) => {
  const offerElement = templatePopup.cloneNode(true);
  const avatar = offerElement.querySelector('.popup__avatar');
  const title = offerElement.querySelector('.popup__title');
  const description = offerElement.querySelector('.popup__description');
  const address = offerElement.querySelector('.popup__text--address');
  const price = offerElement.querySelector('.popup__text--price');
  const type = offerElement.querySelector('.popup__type');
  const capacity = offerElement.querySelector('.popup__text--capacity');
  const time = offerElement.querySelector('.popup__text--time');
  const features = offerElement.querySelector('.popup__features');
  const photoContainer = offerElement.querySelector('.popup__photos');

  if (offer.title) {
    title.textContent = offer.title;
  } else {
    title.remove();
  }

  if (offer.address) {
    address.textContent = offer.address;
  } else {
    address.remove();
  }

  if (offer.price) {
    price.textContent = `${offer.price} ₽/ночь`;
  } else {
    price.remove();
  }

  if (offer.type) {
    type.textContent = TYPES[offer.type];
  } else {
    type.remove();
  }

  if (offer.rooms && offer.guests) {
    capacity.textContent = `${offer.rooms} ${numDecline((offer.rooms), ROOMS)} ${offer.guests} ${numDecline((offer.guests), GUESTS)}`;
  } else {
    capacity.remove();
  }

  if (offer.checkin && offer.checkout) {
    time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    time.remove();
  }

  if (offer.description) {
    description.textContent = offer.description;
  } else {
    description.remove();
  }

  if (author.avatar) {
    avatar.src = author.avatar;
  } else {
    avatar.remove();
  }

  if (offer.photos) {
    photoContainer.appendChild(renderImages(photoContainer, offer.photos));
  } else {
    photoContainer.remove()
  }

  if (offer.features) {
    renderFeatures(offer.features, features);
  } else {
    features.remove()
  }

  return offerElement;
};

export { createCard };
