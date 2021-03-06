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

  var applyFilters = function (filtersMap) {
    var checkedHousingFeatures = mapFiltersForm.querySelectorAll('#housing-features input:checked');

    var filterByNumber = function (advert, key) {
      return advert.offer[key] === Number(filtersMap[key].value);
    };

    var filteredAdvert = Object.keys(filtersMap).reduce(function (filteredArray, key) {
      return filtersMap[key].value === 'any'
        ? filteredArray
        : filteredArray.filter(function (advert) {
          return filtersMap[key].filter ? filtersMap[key].filter(advert, key) : filterByNumber(advert, key);
        });
    }, window.initialAdverts);

    checkedHousingFeatures.forEach(function (checkedFeature) {
      filteredAdvert = filteredAdvert.filter(function (advert) {
        return advert.offer.features.includes(checkedFeature.value);
      });
    });

    return filteredAdvert.slice(0, 5);
  };

  var mapFilterHandler = function () {
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
          var price = {
            'low': advert.offer[key] < LOW_PRICE,
            'high': advert.offer[key] > HIGH_PRICE,
            'middle': advert.offer[key] > LOW_PRICE && advert.offer[key] < HIGH_PRICE
          };
          return price[filtersMap[key].value];
        }
      },
      rooms: {
        value: housingRooms.value
      },
      guests: {
        value: housingGuests.value
      },
    };

    window.card.adverts = applyFilters(filtersMap);

    window.pin.removePins();
    window.card.removeMapCards();
    window.pin.buildPinsFragment();
    window.card.getMapCards();
    window.card.addMapPinsListeners();
  };

  var addMapFilterListener = function (mapFilter) {
    mapFilter.addEventListener('change', function () {
      window.util.debounce(mapFilterHandler);
    });
  };

  var addFilterListeners = function () {
    mapFilters.forEach(addMapFilterListener);
    housingFeatures.forEach(addMapFilterListener);
  };

  var init = function () {
    addFilterListeners();
  };

  init();
})();
