'use strict';

function normalise(x, scale) {
  return (x - scale[0]) / (scale[1] - scale[0]);
}

module.exports = normalise;
