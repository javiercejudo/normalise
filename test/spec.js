'use strict';

var should = require('should');
var sinon = require('sinon');
var rescaleUtil = require('rescale-util');
var normalise = require('../src/normalise.js').normalise;

describe('normalising', function() {
  describe('without a scale', function() {
    it('should be the identity', function() {
      normalise(1).should.be.exactly(1);
      normalise(Math.E).should.be.exactly(Math.E);
    });
  });

  describe('with valid scales', function() {
    beforeEach(function() {
      sinon.stub(rescaleUtil, 'isValidScale').returns(true);
    });

    afterEach(function() {
      rescaleUtil.isValidScale.restore();
    });

    it('should normalise data', function() {
      normalise(2.5, [0, 5]).should.be.exactly(.5);
      normalise(3, [1, 2]).should.be.exactly(2);
      normalise(-3, [-5, 1]).should.be.exactly(1/3);
    });
  });

  describe('with invalid scales', function() {
    beforeEach(function() {
      sinon.stub(rescaleUtil, 'isValidScale').returns(false);
      sinon.stub(rescaleUtil, 'getLastError').returns('an error');
    });

    afterEach(function() {
      rescaleUtil.isValidScale.restore();
      rescaleUtil.getLastError.restore();
    });

    it('should throw an error', function() {
      (function() {
        normalise(2, 2);
      }).should.throw('an error');
    });
  });
});
