'use strict';

(function () {
  var form = document.querySelector('.notice__form');

  var deactivate = function () {
    window.form.deactivateFieldset();
    window.util.addClass('.map', 'map--faded');
    window.util.addClass('.notice__form', 'notice__form--disabled');
    window.card.closeMapCard();
    window.pin.removePins();
  };

  var mapFilters = window.util.map.querySelectorAll('.map__filter');
  var mapFiltersForm = window.util.map.querySelector('.map__filters');

  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');
  var housingFeatures = mapFiltersForm.querySelectorAll('.map__filter-set input');

  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  window.debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var mapFilterHandler = function () {
    var filtersMap = {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value
    };

    window.card.advertArr = Object.keys(filtersMap).reduce(function (filteredArray, key) {
      if (filtersMap[key] === 'any') {
        return filteredArray;
      }
      return filteredArray.filter(function (advert) {
        return advert.offer[key] === filtersMap[key];
      });
    }, window.initialAdvertArr);

    var checkedHousingFeatures = mapFiltersForm.querySelectorAll('#housing-features input:checked');

    checkedHousingFeatures.forEach(function (checkedFeature) {
      window.card.advertArr = window.card.advertArr.filter(function (advert) {
        return advert.offer.features.includes(checkedFeature.value);
      });
    });

    window.pin.removePins();
    window.pin.buildPinsFragment();
    window.card.addMapPinsEventListeners();
  };

  // var a = window.debounce(mapFilterHandler);

  var mapFilterEvt = function (mapFilter) {
    mapFilter.addEventListener('change', function () {
      window.debounce(mapFilterHandler);
    });
  };

  mapFilters.forEach(mapFilterEvt);
  housingFeatures.forEach(mapFilterEvt);

  var successHandler = function (adverts) {
    window.initialAdvertArr = adverts.slice();
    window.card.advertArr = adverts;
    window.pageActivation.activateHandler();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-messange');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      deactivate();
    });
    evt.preventDefault();
  });
})();
