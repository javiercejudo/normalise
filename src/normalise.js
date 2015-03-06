/*jshint node:true */

'use strict';

var rescaleUtil = require('rescale-util');

exports.normalise = function normalise(x, scale) {
  if (typeof scale === 'undefined') {
    return x;
  }

  if (!rescaleUtil.isValidScale(scale)) {
    throw new Error(rescaleUtil.getLastError());
  }

  return (x - scale[0]) / (scale[1] - scale[0]);
};
