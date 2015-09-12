# normalise

[![Build Status](https://travis-ci.org/javiercejudo/normalise.svg)](https://travis-ci.org/javiercejudo/normalise)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/normalise/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/normalise?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/normalise/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/normalise)

Normalise data to [0, 1], i.e. [feature scaling](http://en.wikipedia.org/wiki/Feature_scaling).

## Install

    npm i normalise

## Usage

```js
var Decimal = require('linear-arbitrary-precision')(require('floating-adapter'));
var normalise = require('normalise')(Decimal).normalise;

normalise([0, 5], 2.5); // => Decimal 0.5
normalise([1, 2], 3); // => Decimal 2
normalise([-5, 1], -3); // => Decimal 1/3
```

See [spec](test/spec.js).

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [rescale-util](https://github.com/javiercejudo/rescale-util): rescale utilities.
