'use strict';

let utils = require('./utils');

var template = document.querySelector('.winner-template'),
  elementToClone = null;

if (template) {
  if (utils.isTemplateSupported()) {
    elementToClone = template.content.querySelector('tr');
  } else {
    elementToClone = template.querySelector('tr');
  }
}

module.exports = function() {
  return elementToClone;
};