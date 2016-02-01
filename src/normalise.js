/*jshint node:true */

'use strict';

var toDecimalFactory = require('to-decimal-arbitrary-precision');

module.exports = function factory(Decimal) {
  var toDecimal = toDecimalFactory(Decimal);

  return Object.freeze({
    normalise: function normalise(scale, x) {
      var scale0 = toDecimal(scale[0]);

      return toDecimal(x).minus(scale0)
        .div(toDecimal(scale[1]).minus(scale0));
    }
  });
};
