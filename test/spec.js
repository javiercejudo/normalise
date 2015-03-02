var should = require('should');
var normalise = require('../src/normalise.js');

describe('Rescale', function() {
  it('should normalise data', function() {
    normalise(2.5, [0, 5]).should.be.exactly(.5);
    normalise(3, [1, 2]).should.be.exactly(2);
    normalise(-3, [-5, 1]).should.be.exactly(1/3);
  });
});
