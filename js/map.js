/* global L:readonly */
import { request } from './api.js'
import { createCard } from './popup.js';
import { toggleActivateForm, setAdds, resetButton, adForm, onChangeMinPrice, onChangeRoomNumber, mapFilters } from './form.js';
import { successPopupContent, popupError, errorButton, showError, showAlert, closePopup, debounce } from './util.js';
import { filterData, MAX_OFFERS } from './sort.js';

const RERENDER_DELAY = 500;

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

const openStrUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const mapAtrr = '&copy; <a href="https://www.openstreet.org/copiryght">OpenStreeetMap</a> contibutors | Icons made by <a href="https://www.freepic.com" title="Freepic">Freepic</a> from <a href="https://www.flaticon.com/" title="Flatcon">www.flatcon.com</a>';

let markers = [];

const onError = () => {
  showAlert('Ошибка обработки данных!');
};

const map = L.map('map-canvas')
  .on('load', () => {
    toggleActivateForm();
    setAdds(CENTER_MAP);
  })
  .setView(CENTER_MAP, SCALE);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
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

const layerGroup = L.layerGroup().addTo(map);

const removeMarkers = () => {
  layerGroup.clearLayers();
  map.closePopup();
};

const createMapIcon = (points) => {
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
      .addTo(layerGroup)
      .bindPopup(
        createCard(point),
        {
          keepInViev: true,
        },
      );
  });
};

L.tileLayer(
  openStrUrl,
  {
    attribution: mapAtrr,
  },
).addTo(map);

mainMarker.on('move', (evt) => {
  setAdds(evt.target.getLatLng());
});

mainMarker.addTo(map);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [Icon.WIDTH, Icon.HEIGHT],
  iconAnchor: [Icon.WIDTH / 2, Icon.HEIGHT],
});

const onMapFiltersChange = debounce(() => {
  removeMarkers();
  createMapIcon(filterData(markers.slice()));
}, RERENDER_DELAY);

const onSuccess = (data) => {
  markers = data.slice();
  createMapIcon(markers.slice(0, MAX_OFFERS));
  mapFilters.addEventListener('change', onMapFiltersChange);
};

request(onSuccess, onError, 'GET');


const resetMap = () => {
  mainMarker.setLatLng([CENTER_MAP.lat, CENTER_MAP.lng]);
  map.setView({
    lat: CENTER_MAP.lat,
    lng: CENTER_MAP.lng,
  }, SCALE);
  setAdds(CENTER_MAP)
  removeMarkers();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
  createMapIcon(markers);
});

const resetForm = () => {
  adForm.reset();
  onChangeMinPrice();
  onChangeRoomNumber();
  mapFilters.reset();
  resetMap();
  createMapIcon(markers);
  document.body.append(successPopupContent);
  closePopup(successPopupContent);
  closePopup(popupError, errorButton);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  request(resetForm, showError, 'POST', new FormData(evt.target));
  closePopup(popupError, errorButton);
});

export { };
