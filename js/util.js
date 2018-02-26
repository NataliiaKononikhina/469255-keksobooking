'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms

  var lastTimeout;
  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Удаление класса у любого узла
  var removeClass = function (selector, className) {
    var node = document.querySelector(selector);

    node.classList.remove(className);
  };

  var addClass = function (selector, className) {
    var node = document.querySelector(selector);

    node.classList.add(className);
  };

  var deactivate = function (element, valid) {
    element.disabled = valid;
  };

  window.util = {
    debounce: debounce,
    getRandomNumber: getRandomNumber,
    removeClass: removeClass,
    deactivate: deactivate,
    fieldset: document.querySelectorAll('fieldset'),
    map: document.querySelector('.map'),
    template: document.querySelector('template'),
    addClass: addClass
  };
})();
