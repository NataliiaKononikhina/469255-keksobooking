'use strict';

(function () {
  var LIMITATION_TOP = 100;
  var LIMITATION_BOTTOM = 500;
  var FROM_CENTER_TO_BOTTOM_PIN = 45;
  var PIN_HEIGHT = 155;

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

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      if (mapPinMain.offsetTop < LIMITATION_TOP) {
        mapPinMain.style.top = LIMITATION_TOP + 'px';
      }
      if ((mapPinMain.offsetTop - PIN_HEIGHT) > LIMITATION_BOTTOM) {
        mapPinMain.style.top = (LIMITATION_BOTTOM + PIN_HEIGHT) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      onMouseMove(upEvt);

      window.util.map.removeEventListener('mousemove', onMouseMove);
      window.util.map.removeEventListener('mouseup', onMouseUp);
      window.util.map.removeEventListener('mouseleave', onMouseUp);
      mapPinMain.removeEventListener('mouseup', activate);
    };

    window.util.map.addEventListener('mousemove', onMouseMove);
    window.util.map.addEventListener('mouseup', onMouseUp);
    window.util.map.addEventListener('mouseleave', onMouseUp);
    mapPinMain.addEventListener('mouseup', activate);
  });
})();
