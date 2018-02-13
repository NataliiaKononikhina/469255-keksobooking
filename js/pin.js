'use strict';

(function () {
  // Создание фрагмента с метоками квартир для карты города
  var getMapPins = function () {
    var arr = window.data.advertArr;
    var similarMapPin = window.util.template.content.querySelector('.map__pin');

    return arr.reduce(function (fragment, advert) {
      var mapPin = similarMapPin.cloneNode(true);

      mapPin.style.left = advert.location.x + 'px';
      mapPin.style.top = advert.location.y + 'px';
      mapPin.querySelector('img').src = advert.author.avatar;
      fragment.appendChild(mapPin);

      return fragment;
    }, document.createDocumentFragment());
  };

  // Добавление меток на карту города
  var buildPinsFragment = function () {
    var mapPins = window.util.map.querySelector('.map__pins');

    mapPins.appendChild(getMapPins());
  };

  window.pin = {
    buildPinsFragment: buildPinsFragment
  };
})();
