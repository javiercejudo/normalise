/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');
var RescaleError = rescaleUtil.RescaleError;

exports.normalise = function normalise(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new RescaleError(rescaleUtil.getLastError());
  }

  return (x - scale[0]) / (scale[1] - scale[0]);
};
