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

  window.util = {
    debounce: debounce,
    fieldsets: document.querySelectorAll('fieldset'),
    map: document.querySelector('.map'),
    template: document.querySelector('template'),
    form: document.querySelector('.notice__form'),
    ENTER_CLICK: 13,
    ESC_CLICK: 27
  };
})();
