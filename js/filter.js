'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;
  var mapFilters = window.util.map.querySelectorAll('.map__filter');
  var mapFiltersForm = window.util.map.querySelector('.map__filters');

  var housingType = mapFiltersForm.querySelector('#housing-type');
  var housingPrice = mapFiltersForm.querySelector('#housing-price');
  var housingRooms = mapFiltersForm.querySelector('#housing-rooms');
  var housingGuests = mapFiltersForm.querySelector('#housing-guests');
  var housingFeatures = mapFiltersForm.querySelectorAll('.map__filter-set input');

  var mapFilterHandler = function () {
    var filterByNumber = function (advert, key) {
      return advert.offer[key] === Number(filtersMap[key].value);
    };

    var filtersMap = {
      type: {
        value: housingType.value,
        filter: function (advert, key) {
          return advert.offer[key] === filtersMap[key].value;
        }
      },
      price: {
        value: housingPrice.value,
        filter: function (advert, key) {
          var Price = {
            'low': advert.offer[key] < LOW_PRICE,
            'high': advert.offer[key] > HIGH_PRICE,
            'middle': advert.offer[key] > LOW_PRICE && advert.offer[key] < HIGH_PRICE
          };
          return Price[filtersMap[key].value];
        }
      },
      rooms: {
        value: housingRooms.value
      },
      guests: {
        value: housingGuests.value
      },
    };

    window.card.advertArr = Object.keys(filtersMap).reduce(function (filteredArray, key) {
      if (filtersMap[key].value === 'any') {
        return filteredArray;
      }
      return filteredArray.filter(function (advert) {
        return filtersMap[key].filter ? filtersMap[key].filter(advert, key) : filterByNumber(advert, key);
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
