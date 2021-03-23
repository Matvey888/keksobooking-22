import { mapFilters } from './form.js';

const MAX_OFFERS = 10;
const DEFAULT_VALUE = 'any';

const priceMap = {
  'low': {
    start: 0,
    end: 10000,
  },
  'middle': {
    start: 10000,
    end: 50000,
  },
  'high': {
    start: 50000,
    end: Infinity,
  },
};

const filters = Array.from(mapFilters.children);
// console.log(filters);

const filterRules = {
  'housing-type': (data, filter) => {
    return filter.value === data.offer.type;
  },
  'housing-price': (data, filter) => {
    return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
  },
  'housing-rooms': (data, filter) => {
    return filter.value === data.offer.rooms.toString();
  },
  'housing-guests': (data, filter) => {
    return filter.value === data.offer.guests.toString();
  },
  'housing-features': (data, filter) => {
    let checkListElements = Array.from(filter.querySelectorAll('input[type="checkbox"]:checked'));

    return checkListElements.every((checkbox) => {
      return data.offer.features.some((feature) => {
        return feature === checkbox.value;
      });
    });
  },
};

const filterData = (data) => {
  let offers = [];
  let i = 0;
  let result;

  while (i < data.length && offers.length < MAX_OFFERS) {
    result = filters.every((filter) => {
      return (filter.value === DEFAULT_VALUE) ? true : filterRules[filter.id](data[i], filter);
    });

    if (result) {
      offers.push(data[i]);
    }

    i++;
  }

  return offers;
};

export { filterData };
