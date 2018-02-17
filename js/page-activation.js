'use strict';

(function () {
  var LIMITATION_TOP = 100;
  var LIMITATION_BOTTOM = 500;
  var FROM_CENTER_TO_BOTTOM_PIN = 45;
  var PIN_HEIGHT = 155;
  var PIN_HALF_WIDTH = 10;

  var address = document.querySelector('#address');
  var mapPinMain = window.util.map.querySelector('.map__pin--main');

  // Добавление адреса в поле "Адрес"
  var setAddress = function (element) {
    address.value = element.offsetLeft + ', ' + (element.offsetTop + FROM_CENTER_TO_BOTTOM_PIN);
  };

  // Метод активации страницы
  var activate = function (evt) {
    window.util.removeClass('.map', 'map--faded');
    window.util.removeClass('.notice__form', 'notice__form--disabled');
    window.util.fieldset.forEach(function (element) {
      window.util.deactivate(element, false);
    });
    window.pin.buildPinsFragment();
    window.card.addMapPinsEventListeners();
    setAddress(evt.currentTarget);
    mapPinMain.removeEventListener('mouseup', activate);
    window.form.enableCorrectOptions(window.form.appartmentRoomNumber.value);
  };

  setAddress(mapPinMain);

  var checkCoords = function (newCoords) {
    if (newCoords.y < LIMITATION_TOP) {
      newCoords.y = LIMITATION_TOP;
    }
    if ((newCoords.y - PIN_HEIGHT) > LIMITATION_BOTTOM) {
      newCoords.y = (LIMITATION_BOTTOM + PIN_HEIGHT);
    }
    if (newCoords.x < PIN_HALF_WIDTH) {
      newCoords.x = PIN_HALF_WIDTH;
    }
    if (newCoords.x > (document.body.clientWidth - PIN_HALF_WIDTH)) {
      newCoords.x = document.body.clientWidth - PIN_HALF_WIDTH;
    }
    return newCoords;
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      newCoords = checkCoords(newCoords);

      mapPinMain.style.top = newCoords.y + 'px';
      mapPinMain.style.left = newCoords.x + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      onMouseMove(upEvt);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      mapPinMain.removeEventListener('mouseup', activate);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    mapPinMain.addEventListener('mouseup', activate);
  });
})();
