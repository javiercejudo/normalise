/*jshint node:true */

'use strict';

module.exports = function factory(Decimal) {
  var api = {};

  api.normalise = function normalise(scale, x) {
    var scale0 = new Decimal(scale[0].toString());

    return new Decimal(x.toString()).minus(scale0)
      .div(new Decimal(scale[1].toString()).minus(scale0));
  };

  return api;
};
