'use strict';

(function () {
  var form = document.querySelector('.notice__form');

  var deactivate = function () {
    window.form.deactivateFieldset();
    window.util.addClass('.map', 'map--faded');
    window.util.addClass('.notice__form', 'notice__form--disabled');
    window.card.closeMapCard();
    window.pin.removePins();
  };

  var successHandler = function (pins) {
    window.card.advertArr = pins;
    window.pageActivation.activateHandler();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-messange');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      deactivate();
    });
    evt.preventDefault();
  });
})();
