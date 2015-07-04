/*jshint node:true */

'use strict';

var arbitraryPrecision = require('rescale-arbitrary-precision');

var Decimal = arbitraryPrecision.load();

exports.normalise = function normalise(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (arbitraryPrecision.isAvailable()) {
    return Number(normaliseDecimal(x, scale));
  }

  return normaliseNative(x, scale);
};

function normaliseDecimal(x, scale) {
  return new Decimal(x).minus(scale[0])
    .div(new Decimal(scale[1]).minus(scale[0]));
}

function normaliseNative(x, scale) {
  return (x - scale[0]) / (scale[1] - scale[0]);
}
