'use strict';

(function () {
  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Удаление класса у любого узла
  var removeClass = function (selector, className) {
    var node = document.querySelector(selector);

    node.classList.remove(className);
  };

  var deactivate = function (element, valid) {
    element.disabled = valid;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    removeClass: removeClass,
    deactivate: deactivate,
    fieldset: document.querySelectorAll('fieldset'),
    map: document.querySelector('.map'),
    template: document.querySelector('template')
  };
})();
