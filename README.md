# normalise

[![Build Status](https://travis-ci.org/javiercejudo/normalise.svg)](https://travis-ci.org/javiercejudo/normalise)
[![Coverage Status](https://coveralls.io/repos/javiercejudo/normalise/badge.svg?branch=master)](https://coveralls.io/r/javiercejudo/normalise?branch=master)
[![Code Climate](https://codeclimate.com/github/javiercejudo/normalise/badges/gpa.svg)](https://codeclimate.com/github/javiercejudo/normalise)

Normalise data to [0, 1], i.e. [feature scaling](http://en.wikipedia.org/wiki/Feature_scaling).

## Install

    npm i normalise

## Usage

```js
var normalise = require('normalise').normalise;

normalise(2.5, [0, 5]); // => 0.5
normalise(3, [1, 2]); // => 2
normalise(-3, [-5, 1]); // => 1/3

normalise(Math.E); // => Math.E

normalise(-3, 'invalid scale'); // => RescaleError
```

See [spec](test/spec.js).

## Related projects

- [linear-converter](https://github.com/javiercejudo/linear-converter): flexible linear converter with built in conversions for common units.
- [rescale](https://github.com/javiercejudo/rescale): rescales a point given two scales.
- [scale](https://github.com/javiercejudo/scale): scales normalised data.
- [rescale-util](https://github.com/javiercejudo/rescale-util): rescale utilities.
