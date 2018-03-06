'use strict';

(function () {
  var TIMEOUT_ERROR_MESSAGE = 3000;

  var noticeForm = document.querySelector('.notice__form');

  var successHandler = function (adverts) {
    window.initialAdverts = adverts.slice();
    window.card.adverts = adverts.slice(0, 5);
    window.map.addMapPinMainListeners();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-messange');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, TIMEOUT_ERROR_MESSAGE);
  };

  var onMapPinMainMouseup = function () {
    activate();
  };

  var onMapPinMainEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER_CLICK) {
      activate();
    }
  };

  var activate = function () {
    window.util.map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.form.toggleDisable(false);
    window.pin.buildPinsFragment();
    window.card.addMapPinsListeners();
    window.map.mapPinMain.removeEventListener('mouseup', onMapPinMainMouseup);
    window.map.mapPinMain.removeEventListener('keydown', onMapPinMainEnterPress);
    window.form.enableCorrectOptions(window.form.appartmentRoomNumber.value);
    window.card.getMapCards();
    window.form.setMinPrice();
  };

  var deactivate = function () {
    window.form.toggleDisable(true);
    noticeForm.reset();
    window.util.map.classList.add('map--faded');
    window.util.form.classList.add('notice__form--disabled');
    window.card.closeMapCard();
    window.pin.removePins();
    window.card.removeMapCards();
    window.map.setMapPinMainCoordinates();
    window.map.setAddress(window.map.mapPinMain);
  };

  window.backend.load(successHandler, errorHandler);

  window.util.form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.util.form), function () {
      deactivate();
    }, errorHandler);
    evt.preventDefault();
  });

  window.setup = {
    activate: activate,
    onMapPinMainMouseup: onMapPinMainMouseup,
    onMapPinMainEnterPress: onMapPinMainEnterPress
  };
})();
