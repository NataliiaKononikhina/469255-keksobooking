'use strict';

(function () {
  var LIMITATION_TOP = 100;
  var LIMITATION_BOTTOM = 500;
  var FROM_CENTER_TO_BOTTOM_PIN = 45;
  var PIN_HEIGHT = 155;
  var PIN_OFFSET_X = 80;
  var MAP_PIN_MAIN_LEFT = '50%';
  var MAP_PIN_MAIN_TOP = '375px';

  var address = document.querySelector('#address');
  var mapPinMain = window.util.map.querySelector('.map__pin--main');

  // Добавление адреса в поле "Адрес"
  var setAddress = function (element) {
    address.value = element.offsetLeft + ', ' + (element.offsetTop + FROM_CENTER_TO_BOTTOM_PIN);
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
    mapPinMain.addEventListener('keydown', window.setup.activate);
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
        if (window.util.map.classList.contains('map--faded')) {
          window.setup.activate(upEvt);
        }
        setAddress(mapPinMain);

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        mapPinMain.removeEventListener('mouseup', window.setup.activate);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  var setMapPinMainCoordinates = function () {
    window.map.mapPinMain.style.left = MAP_PIN_MAIN_LEFT;
    window.map.mapPinMain.style.top = MAP_PIN_MAIN_TOP;
  };

  var init = function () {
    setAddress(mapPinMain);
  };

  init();

  window.map = {
    addMapPinMainListeners: addMapPinMainListeners,
    setAddress: setAddress,
    mapPinMain: mapPinMain,
    setMapPinMainCoordinates: setMapPinMainCoordinates
  };
})();
