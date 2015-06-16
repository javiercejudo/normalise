/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');
var arbitraryPrecision = require('rescale-arbitrary-precision');

var RescaleError = rescaleUtil.RescaleError;
var decimal = exports.decimal = arbitraryPrecision.load();

exports.normalise = function normalise(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

  if (arbitraryPrecision.isAvailable()) {
    return Number(normaliseDecimal(x, scale));
  }

  return normaliseNative(x, scale);
};

function normaliseDecimal(x, scale) {
  return decimal(x).minus(scale[0])
    .div(decimal(scale[1]).minus(scale[0]));
}

function normaliseNative(x, scale) {
  return (x - scale[0]) / (scale[1] - scale[0]);
}
