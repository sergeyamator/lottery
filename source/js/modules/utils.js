'use strict';

module.exports = {
  /**
   * Check for browser support template
   * @returns {boolean}
   */
  isTemplateSupported: function() {
    return 'content' in document.createElement('template');
  },

  throttle: function(callback, limit) {
    var wait = false;
    return function() {
      if (!wait) {
        callback.call();
        wait = true;
        setTimeout(function() {
          wait = false;
        }, limit);
      }
    };
  },

  /** @enum {number} */
  keyCode: {
    ENTER: 13,
    ESC: 27,
    SPACE: 32
  },

  getRandom: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};