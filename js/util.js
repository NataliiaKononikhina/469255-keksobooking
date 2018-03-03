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

  window.util = {
    debounce: debounce,
    getRandomNumber: getRandomNumber,
    fieldset: document.querySelectorAll('fieldset'),
    map: document.querySelector('.map'),
    template: document.querySelector('template'),
    ENTER_CLICK: 13
  };
})();
