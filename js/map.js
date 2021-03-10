/* global L:readonly */
import { addOffers, Coordinates } from './data.js';
import { getRandomNumber } from './util.js'
import { createCard } from './popup.js';
import { toggleActivateForm, setAdds } from './form.js';

const points = addOffers();

const CENTER_MAP = {
  lat: 35.68950,
  lng: 139.69200,
};

const SCALE = 12;

const MainIcon = {
  WIDTH: 52,
  HEIGHT: 52,
};

const Icon = {
  WIDTH: 40,
  HEIGHT: 40,
};

const initMap = () => {
  const map = L.map('map-canvas')
    .on('load', () => {
      toggleActivateForm();
      setAdds(CENTER_MAP);
    })
    .setView(CENTER_MAP, SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreet.org/copiryght">OpenStreeetMap</a> contibutors | Icons made by <a href="https://www.freepic.com" title="Freepic">Freepic</a> from <a href="https://www.flaticon.com/" title="Flatcon">www.flatcon.com</a>',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: '/img/main-pin.svg',
    iconSize: [MainIcon.WIDTH, MainIcon.HEIGHT],
    iconAnchor: [MainIcon.WIDTH / 2, MainIcon.HEIGHT],
  });

  const mainMarker = L.marker(
    CENTER_MAP,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainMarker.on('moveend', (evt) => {
    setAdds(evt.target.getLatLng());
  });

  mainMarker.addTo(map);

  const icon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [Icon.WIDTH, Icon.HEIGHT],
    iconAnchor: [Icon.WIDTH / 2, Icon.HEIGHT],
  });

  points.forEach((point) => {
    const marker = L.marker(
      {
        lat: getRandomNumber(Coordinates.MIN_X,Coordinates.MAX_X, 5),
        lng: getRandomNumber(Coordinates.MIN_Y,Coordinates.MAX_Y, 5),
      },
      {
        draggable: false,
        icon: icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(
        createCard(point),
      );
  });

  return map;
};

export { initMap };
