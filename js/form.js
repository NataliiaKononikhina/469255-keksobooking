'use strict';

(function () {
  var MIN_PRICE = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };
  var CAPACITY_ROOMS = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var appartmentType = document.querySelector('#type');
  var appartmentRoomNumber = document.querySelector('#room_number');
  var appartmentTimein = document.querySelector('#timein');
  var appartmentTimeout = document.querySelector('#timeout');
  var appartmentCapacity = document.querySelector('#capacity');
  var options = appartmentCapacity.querySelectorAll('option');
  var appartmentPrice = document.querySelector('#price');

  var enableCorrectOptions = function (value) {
    var rooms = CAPACITY_ROOMS[value];

    appartmentCapacity.querySelector('[value="' + rooms[0] + '"]').selected = true;
    options.forEach(function (option) {
      option.disabled = !rooms.includes(option.value);
    });
  };

  var toggleDisable = function (value) {
    window.util.fieldsets.forEach(function (element) {
      element.disabled = value;
    });
  };

  var setMinPrice = function (value) {
    var minPriceValue = MIN_PRICE[value];

    appartmentPrice.min = minPriceValue;
  };

  var addFormListeners = function () {
    appartmentType.addEventListener('change', function (evt) {
      setMinPrice(evt.currentTarget.value);
    });

    appartmentTimein.addEventListener('change', function (evt) {
      appartmentTimeout.selectedIndex = evt.currentTarget.selectedIndex;
    });

    appartmentTimeout.addEventListener('change', function (evt) {
      appartmentTimein.selectedIndex = evt.currentTarget.selectedIndex;
    });

    appartmentRoomNumber.addEventListener('change', function (evt) {
      window.form.enableCorrectOptions(evt.currentTarget.value);
    });
  };

  var init = function () {
    toggleDisable(true);
    addFormListeners();
  };

  init();

  window.form = {
    appartmentRoomNumber: appartmentRoomNumber,
    enableCorrectOptions: enableCorrectOptions,
    toggleDisable: toggleDisable,
    setMinPrice: setMinPrice,
    appartmentType: appartmentType
  };
})();
