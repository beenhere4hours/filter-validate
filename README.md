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
|validEmail      |Checks for a valid email address|
|maxLen,n        |Checks key value length, makes sure it's not longer than the specified length. n = length parameter.|
|minLen,n        |Checks key value length, makes sure it's not shorter than the specified length. n = length parameter.|
|exactLen,n      |Ensures that the key value length precisely matches the specified length. n = length parameter.|
|alpha           |Ensure only alpha characters are present in the key value (a-z, A-Z)|
|alphaNumeric    |Ensure only alpha-numeric characters are present in the key value (a-z, A-Z, 0-9)|
|alphaDash       |Ensure only alpha-numeric characters + dashes and underscores are present in the key value (a-z, A-Z, 0-9, _-)|
|alphaSpace      |Ensure only alpha-numeric characters + spaces are present in the key value (a-z, A-Z, 0-9, \s)|
|numeric         |Ensure only numeric key values|
|integer         |Ensure only integer key values|
|float           |Checks for float values|

