'use strict';

(function () {
  var mapFilters = window.util.map.querySelectorAll('.map__filter');
  var mapFiltersForm = window.util.map.querySelector('.map__filters');

  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');
  var housingFeatures = mapFiltersForm.querySelectorAll('.map__filter-set input');

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

  var mapFilterEvt = function (mapFilter) {
    mapFilter.addEventListener('change', function () {
      window.util.debounce(mapFilterHandler);
    });
  };

  mapFilters.forEach(mapFilterEvt);
  housingFeatures.forEach(mapFilterEvt);
})();
