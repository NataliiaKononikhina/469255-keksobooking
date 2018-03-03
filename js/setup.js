'use strict';

(function () {
  var successHandler = function (adverts) {
    window.initialAdvertArr = adverts.slice();
    window.card.advertArr = adverts.slice(0, 5);
    window.pageState.addMapPinMainListeners();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error-messange');

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.util.form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.util.form), function () {
      window.pageState.deactivate();
    });
    evt.preventDefault();
  });
})();
