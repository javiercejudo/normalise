/*jshint node:true */

'use strict';

var isUndefined = require('lodash.isundefined');
var unitScale = require('unit-scale');

module.exports = function factory(Decimal) {
  var api = {};

  api.normalise = function normalise(x, scale) {
    scale = scale || unitScale;

    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(x.toString()).minus(scale0)
      .div(new Decimal(scale[1].toString()).minus(scale0));
  };

  return api;
};
