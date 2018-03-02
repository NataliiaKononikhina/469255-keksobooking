'use strict';

(function () {
  var LIMITATION_TOP = 100;
  var LIMITATION_BOTTOM = 500;
  var FROM_CENTER_TO_BOTTOM_PIN = 45;
  var PIN_HEIGHT = 155;
  var PIN_OFFSET_X = 80;

  var address = document.querySelector('#address');
  var mapPinMain = window.util.map.querySelector('.map__pin--main');

  var noticeForm = document.querySelector('.notice__form');

  // Добавление адреса в поле "Адрес"
  var setAddress = function (element) {
    address.value = element.offsetLeft + ', ' + (element.offsetTop + FROM_CENTER_TO_BOTTOM_PIN);
  };

  // Метод активации страницы
  var activate = function (evt) {
    if (evt.type !== 'mouseup' && !(evt.type === 'keydown' && evt.keyCode === window.util.ENTER_CLICK)) {
      return;
    }
    window.util.map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.util.fieldset.forEach(function (element) {
      window.util.deactivate(element, false);
    });
    window.pin.buildPinsFragment();
    window.card.addMapPinsListeners();
    setAddress(evt.currentTarget);
    mapPinMain.removeEventListener('mouseup', activate);
    window.form.enableCorrectOptions(window.form.appartmentRoomNumber.value);
    window.card.getMapCards();
  };

  var checkCoords = function (newCoords) {
    var maxX = document.body.clientWidth - PIN_OFFSET_X;
    var maxY = LIMITATION_BOTTOM + PIN_HEIGHT;

    if (newCoords.y < LIMITATION_TOP) {
      newCoords.y = LIMITATION_TOP;
    }
    if (newCoords.y > maxY) {
      newCoords.y = maxY;
    }
    if (newCoords.x < PIN_OFFSET_X) {
      newCoords.x = PIN_OFFSET_X;
    }
    if (newCoords.x > maxX) {
      newCoords.x = maxX;
    }
    return newCoords;
  };

  var addMapPinMainListeners = function () {
    mapPinMain.addEventListener('keydown', activate);
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
  };

  var init = function () {
    setAddress(mapPinMain);
  };

  init();

  window.pageActivation = {
    addMapPinMainListeners: addMapPinMainListeners
  };
})();
