/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('linear-arbitrary-precision')

var normaliseFactory = require('../src/normalise');
var bigjsAdapter = require('bigjs-adapter')
var floatingAdapter = require('floating-adapter');

describe('normalising', function() {
  describe('without a scale', function() {
    var normalise = normaliseFactory(floatingAdapter).normalise;

    it('should be the identity', function() {
      normalise(42).should.be.exactly(42);
      normalise(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with valid scales', function() {
    describe('when arbitrary precision is available', function() {
      var normalise = normaliseFactory(bigjsAdapter).normalise;

      it('should work with arbitrary precision', function() {
        normalise(0.4, [0.3, 0.5]).should.be.exactly(1/2);
        normalise(-3, [-5, 1]).should.be.exactly(1/3);
      });
    });

    describe('when arbitrary precision is unavailable', function() {
      var normalise = normaliseFactory(floatingAdapter).normalise;

      it('should work with floating-point numbers', function() {
        normalise(0.4, [0.3, 0.5]).should.be.exactly(0.5000000000000001);
        normalise(-3, [-5, 1]).should.be.exactly(1/3);
      });
    });
  });
});
