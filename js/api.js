const Urls = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
  POST: 'https://22.javascript.pages.academy/keksobooking',
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

const sendData = (onSuccess, onError, url, body) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    }).catch(() => {
      onError();
    });
};

export { getData, sendData, Urls };
