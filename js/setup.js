'use strict';

(function () {
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
  };

  var activate = function (evt) {
    if (evt.type !== 'mouseup' && !(evt.type === 'keydown' && evt.keyCode === window.util.ENTER_CLICK)) {
      return;
    }
    window.util.map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    window.form.toggleDisable(false);
    window.pin.buildPinsFragment();
    window.card.addMapPinsListeners();
    window.map.mapPinMain.removeEventListener('mouseup', activate);
    window.form.enableCorrectOptions(window.form.appartmentRoomNumber.value);
    window.card.getMapCards();
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
    activate: activate
  };
})();
