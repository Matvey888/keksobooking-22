const Urls = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
};

const getData = (onSuccess, onError) => {
  fetch(Urls.GET)
    .then((response) => response.json())
    .then((offers) => {
      onSuccess(offers.slice());
    }).catch(() => {
      onError()
    });
};

export { getData }
