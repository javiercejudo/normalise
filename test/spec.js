/*jshint node:true, mocha:true */

'use strict';

var decimalDep = process.env.DECIMAL ? process.env.DECIMAL : 'big.js';

var should = require('should');
var sinon = require('sinon');
var arbitraryPrecision = require('rescale-arbitrary-precision');
var normalise = require('../src/normalise').normalise;

describe('normalising', function() {
  describe('without a scale', function() {
    it('should be the identity', function() {
      normalise(42).should.be.exactly(42);
      normalise(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with valid scales', function() {
    describe('when ' + decimalDep + ' is available', function() {
      var hasArbitraryPrecisionStub;

      beforeEach(function() {
        hasArbitraryPrecisionStub = sinon.stub(arbitraryPrecision, 'isAvailable');
        hasArbitraryPrecisionStub.returns(true);
      });

      afterEach(function() {
        hasArbitraryPrecisionStub.restore();
      });

      it('should work with arbitrary precision', function() {
        normalise(0.4, [0.3, 0.5]).should.be.exactly(1/2);
        normalise(-3, [-5, 1]).should.be.exactly(1/3);
      });
    });

    describe('when ' + decimalDep + ' is unavailable', function() {
      var hasArbitraryPrecisionStub;

      beforeEach(function() {
        hasArbitraryPrecisionStub = sinon.stub(arbitraryPrecision, 'isAvailable');
        hasArbitraryPrecisionStub.returns(false);
      });

      afterEach(function() {
        hasArbitraryPrecisionStub.restore();
      });

      it('should work with floating-point numbers', function() {
        normalise(0.4, [0.3, 0.5]).should.be.exactly(0.5000000000000001);
        normalise(-3, [-5, 1]).should.be.exactly(1/3);
      });
    });
  });
});
