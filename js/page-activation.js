'use strict';

(function () {
  var address = document.querySelector('#address');
  var mapPinMain = window.util.map.querySelector('.map__pin--main');

  // Добавление адреса в поле "Адрес"
  var setAddress = function (element) {
    address.value = element.offsetLeft + ', ' + element.offsetTop;
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
  mapPinMain.addEventListener('mouseup', activate);
})();
