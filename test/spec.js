/*jshint node:true, mocha:true */

'use strict';

var should = require('should');
var sinon = require('sinon');
var rescaleUtil = require('rescale-util');
var big = require('big.js');
var arbitraryPrecision = require('rescale-arbitrary-precision');
var normalise = require('../src/normalise.js').normalise;

describe('normalising', function() {
  describe('without a scale', function() {
    it('should be the identity', function() {
      normalise(1).should.be.exactly(1);
      normalise(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with a scale', function() {
    var rescaleUtilMock;

    afterEach(function () {
      rescaleUtilMock.verify();
    });

    it('should delegate its validation to rescale-util', function() {
      rescaleUtilMock = sinon.mock(rescaleUtil);

      rescaleUtilMock.expects('isValidScale')
        .withExactArgs([0, 5]).returns(true);

      rescaleUtilMock.expects('isValidScale')
        .withExactArgs([-5, 1]).returns(true);

      normalise(2.5, [0, 5]);
      normalise(-3, [-5, 1]);
    });
  });

  describe('with valid scales', function() {
    var isValidScaleStub;

    beforeEach(function() {
      isValidScaleStub = sinon.stub(rescaleUtil, 'isValidScale');
      isValidScaleStub.returns(true);
    });

    afterEach(function() {
      isValidScaleStub.restore();
    });

    describe('when big.js is available', function() {
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

    describe('when big.js is unavailable', function() {
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

  describe('with invalid scales', function() {
    var isValidScaleStub, getLastErrorStub;

    beforeEach(function() {
      isValidScaleStub = sinon.stub(rescaleUtil, 'isValidScale');
      getLastErrorStub = sinon.stub(rescaleUtil, 'getLastError');

      isValidScaleStub.returns(false);
      getLastErrorStub.returns('an error');
    });

    afterEach(function() {
      isValidScaleStub.restore();
      getLastErrorStub.restore();
    });

    it('should throw an error', function() {
      (function() {
        normalise(2, 2);
      }).should.throw(rescaleUtil.RescaleError, {message: 'an error'});
    });
  });
});
