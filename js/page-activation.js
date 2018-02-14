'use strict';

(function () {
  var address = document.querySelector('#address');
  var mapPinMain = window.util.map.querySelector('.map__pin--main');

  // Добавление адреса в поле "Адрес"
  var setAddress = function (element) {
    address.value = element.offsetLeft + ', ' + (element.offsetTop + 48);
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

    var limitationTop = 100;
    var limitationBottom = 500;

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

      if (limitationTop < moveEvt.clientY && moveEvt.clientY < limitationBottom) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.util.map.removeEventListener('mousemove', onMouseMove);
      window.util.map.removeEventListener('mouseup', onMouseUp);
    };

    window.util.map.addEventListener('mousemove', onMouseMove);
    window.util.map.addEventListener('mouseup', onMouseUp);
    mapPinMain.addEventListener('mouseup', activate);
  });
})();
