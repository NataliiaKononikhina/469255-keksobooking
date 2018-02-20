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
    window.data.advertArr = pins;
    window.pageActivation.activateHandler();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 100px auto; padding: 20px; text-align: center; border-top: solid 3px #ff5635; border-bottom: solid 3px #ff5635; background-color: rgba(255, 86, 53, 0.7);';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.style.color = '#fff';

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
