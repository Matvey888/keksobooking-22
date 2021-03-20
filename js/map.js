/* global L:readonly */
import { getData, sendData, Urls } from './api.js'
import { createCard } from './popup.js';
import { toggleActivateForm, setAdds, resetButton, addressElement, adForm } from './form.js';
import { successPopupContent, showError } from './util.js';

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

const map = L.map('map-canvas')
  .on('load', () => {
    toggleActivateForm();
    setAdds(CENTER_MAP);
  })
  .setView(CENTER_MAP, SCALE);

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

const initMap = () => {

  const onSuccess = (points) => {
    points.forEach((point) => {
      const marker = L.marker(
        {
          lat: point.location.lat,
          lng: point.location.lng,
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
  };

  const onError = (error) => {
    throw Error(error);
  };

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreet.org/copiryght">OpenStreeetMap</a> contibutors | Icons made by <a href="https://www.freepic.com" title="Freepic">Freepic</a> from <a href="https://www.flaticon.com/" title="Flatcon">www.flatcon.com</a>',
    },
  ).addTo(map);

  mainMarker.on('moveend', (evt) => {
    setAdds(evt.target.getLatLng());
  });

  mainMarker.addTo(map);

  const icon = L.icon({
    iconUrl: '/img/pin.svg',
    iconSize: [Icon.WIDTH, Icon.HEIGHT],
    iconAnchor: [Icon.WIDTH / 2, Icon.HEIGHT],
  });

  getData(onSuccess, onError);
};

const resetMap = () => {
  mainMarker.setLatLng(L.latLng(CENTER_MAP.lat, CENTER_MAP.lng));
  map.setView({
    lat: CENTER_MAP.lat,
    lng: CENTER_MAP.lng,
  }, SCALE);
}

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
});

const fillAddressInput = () => {
  const {lat, lng} = mainMarker.getLatLng();
  addressElement.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
}

const resetForm = () => {
  adForm.reset();
  fillAddressInput();
  document.body.append(successPopupContent);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(resetForm, showError, Urls.POST, new FormData(evt.target))
});

export { initMap };
