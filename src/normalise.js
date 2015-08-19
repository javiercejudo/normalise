/*jshint node:true */

'use strict';

var isUndefined = require('lodash.isundefined');

module.exports = function factory(Decimal) {
  var api = {};

  api.normalise = function normalise(x, scale) {
    var xDecimal = new Decimal(x.toString());

    if (isUndefined(scale)) {
      return xDecimal;
    }

    var scale0 = new Decimal(scale[0].toString());

    return xDecimal.minus(scale0)
      .div(new Decimal(scale[1].toString()).minus(scale0));
  };

  return api;
};
