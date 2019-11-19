[![Build Status](https://travis-ci.org/beenhere4hours/filter-validate.svg?branch=master)](https://travis-ci.org/beenhere4hours/filter-validate)

filter-validate
=====

A way to transform and validate properties and values.

This is a work in progress...

## Installation
`npm i @beenhere4hours/filter-validate`

## Usage

```
const filterValidate = require("../index").filterValidate;

// WIP
```

## Tests

  `npm test`
  
## Validators

|rule            |description                                               |
|----------------|----------------------------------------------------------|
|required        |Ensures the specified key value exists and is not empty   |
|validEmail      |Checks for a valid email address                          |
|maxLen,n        |Checks key value length, makes sure it's not longer than the specified length. n = length parameter. |
|minLen,n        |Checks key value length, makes sure it's not shorter than the specified length. n = length parameter.|
|exactLen,n      |Ensures that the key value length precisely matches the specified length. n = length parameter.      |