# normalise

[![Build Status](https://travis-ci.org/javiercejudo/normalise.svg)](https://travis-ci.org/javiercejudo/normalise)

Normalise data to [0, 1], i.e. [feature scaling](http://en.wikipedia.org/wiki/Feature_scaling).

## Install

    npm i normalise

## Usage

```js
var normalise = require('normalise').normalise;

normalise(2.5, [0, 5]); // => 0.5
normalise(3, [1, 2]); // => 2
normalise(-3, [-5, 1]); // => 1/3
```

See [spec](test/spec.js).
