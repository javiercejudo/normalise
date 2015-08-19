/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('linear-arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var normaliseFactory = require('../src/normalise');

describe('normalising', function() {
  describe('without a scale', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var normalise = normaliseFactory(Decimal).normalise;

    it('should be the identity', function() {
      normalise(42).val().val().should.be.exactly(42);
      normalise(Math.E).val().val().should.be.exactly(Math.E);
    });
  });

  describe('with valid scales', function() {
    describe('should support', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var normalise = normaliseFactory(Decimal).normalise;

      it('native numbers', function() {
        normalise(0.4, [0.3, 0.5]).val().val().should.be.exactly(0.5000000000000001);
      });

      it('as well as Decimal numbers', function() {
        normalise(new Decimal('0.4'), [new Decimal('0.3'), new Decimal('0.5')])
          .val().val().should.be.exactly(0.5000000000000001);
      });
    });

    describe('when arbitrary precision is available', function() {
      var Decimal = arbitraryPrecision(bigjsAdapter);
      var normalise = normaliseFactory(Decimal).normalise;

      it('should work with arbitrary precision', function() {
        normalise(0.4, [0.3, 0.5]).val().eq(new Decimal('0.5')).should.be.exactly(true);
        normalise(-3, [-5, 1]).val().eq(new Decimal('1').div(new Decimal('3'))).should.be.exactly(true);
      });
    });

    describe('when arbitrary precision is unavailable', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var normalise = normaliseFactory(Decimal).normalise;

      it('should work with floating-point numbers', function() {
        normalise(0.4, [0.3, 0.5]).val().val().should.be.exactly(0.5000000000000001);
        normalise(-3, [-5, 1]).val().val().should.be.exactly(1/3);
      });
    });
  });
});
