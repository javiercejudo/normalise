# normalise [![Build Status](https://travis-ci.org/javiercejudo/normalise.svg)](https://travis-ci.org/javiercejudo/normalise)

Normalise data

## Install

    npm install --save-dev normalise

## Usage

```js
var scale = require('scale-normalised');

normalise(2.5, [0, 5]); // returns 0.5
normalise(3, [1, 2]); // returns 2
normalise(-3, [-5, 1]); // returns 1/3
```
