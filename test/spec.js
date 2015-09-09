/*jshint node:true, mocha:true */

'use strict';

require('should');

var arbitraryPrecision = require('arbitrary-precision');
var bigjsAdapter = require('bigjs-adapter');
var floatingAdapter = require('floating-adapter');
var normaliseFactory = require('../src/normalise');

describe('normalising', function() {
  describe('without a scale', function() {
    var Decimal = arbitraryPrecision(floatingAdapter);
    var normalise = normaliseFactory(Decimal).normalise;

    it('should return a decimal-ised version of the input', function() {
      normalise(0.5).equals(new Decimal('0.5')).should.be.exactly(true);
      normalise(42).equals(new Decimal('42')).should.be.exactly(true);
      normalise(Math.E).equals(new Decimal(String(Math.E))).should.be.exactly(true);
    });
  });

  describe('with valid scales', function() {
    describe('should support', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var normalise = normaliseFactory(Decimal).normalise;

      it('native numbers', function() {
        normalise(0.4, [0.3, 0.5]).equals(new Decimal('0.5000000000000001')).should.be.exactly(true);
      });

      it('as well as Decimal numbers', function() {
        normalise(new Decimal('0.4'), [new Decimal('0.3'), new Decimal('0.5')])
          .equals(new Decimal('0.5000000000000001')).should.be.exactly(true);
      });
    });

    describe('when arbitrary precision is available', function() {
      var Decimal = arbitraryPrecision(bigjsAdapter);
      var normalise = normaliseFactory(Decimal).normalise;

      it('should work with arbitrary precision', function() {
        normalise(0.4, [0.3, 0.5]).equals(new Decimal('0.5')).should.be.exactly(true);
        normalise(-3, [-5, 1]).equals(new Decimal('1').div(new Decimal('3'))).should.be.exactly(true);
      });
    });

    describe('when arbitrary precision is unavailable', function() {
      var Decimal = arbitraryPrecision(floatingAdapter);
      var normalise = normaliseFactory(Decimal).normalise;

      it('should work with floating-point numbers', function() {
        normalise(0.4, [0.3, 0.5]).equals(new Decimal('0.5000000000000001')).should.be.exactly(true);

        normalise(-3, [-5, 1]).equals(new Decimal('1').div(new Decimal('3')))
          .should.be.exactly(true);
      });
    });
  });
});
