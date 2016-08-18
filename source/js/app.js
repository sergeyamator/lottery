'use strict';

//---------------------------------
// Polyfills
//---------------------------------
require('./polyfills/match');
require('./polyfills/closest');

//---------------------------------
// Winners
//---------------------------------
let Form = require('./modules/form');
let form = new Form(document.forms[0]);


