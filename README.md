[![Build Status](https://travis-ci.org/beenhere4hours/filter-validate.svg?branch=master)](https://travis-ci.org/beenhere4hours/filter-validate)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@beenhere4hours/filter-validate)
![npm (scoped)](https://img.shields.io/npm/v/@beenhere4hours/filter-validate)



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
  
## Available Validators

|rule               |description                                               |
|-------------------|----------------------------------------------------------|
|required|Ensures the specified key value exists and is not empty|
|validEmail |Email address is of valid format|
|maxLen,n |Value length is not greater than the length given as n|
|minLen,n |Value length is not less than the length given as n|
|exactLen,n |Value length is same as length given as n|
|alpha |Only alpha characters (a-z, A-Z) are present in the value|
|alphaNumeric |Only alpha-numeric characters, (a-z, A-Z, 0-9), are present in the value|
|alphaDash |Only alpha-numeric characters, dashes, and underscores are present in the value (a-z, A-Z, 0-9, _-)|
|alphaSpace |Only alpha-numeric characters and spaces, (a-z, A-Z, 0-9, \s), are present in the value|
|numeric |Value is numeric|
|integer |Value is an integer|
|float   |Value is a float|
|inList, needle, haystack |Value is contained within the semicolon separated list|
|notInList, needle, haystack |Value is not contained within the semicolon separated list|
|minNumeric,n  |Value is greater than or equal to minimum given as n|
|maxNumeric,n  |Value is less than or equal to maximum given as n|
|date          |Value is a date compliant with ISO 8601|
|starts,needle,n    |Value starts with a character/set of characters starting at a given position.|
|phone              |Value is a phone number that matches one of the patterns '1234567890', 1234567890, '(078)789-8908', '123-345-3456'|
|regex,pattern      |Value passes provided regex validation|

## Available Filters

|rule               |description                                               |
|-------------------|----------------------------------------------------------|
|sanitizeNumbers    |Remove any non-numeric numbers|
|sanitizeEmail      |Remove illegal characters from email addresses|
|trim               |Remove spaces from both sides of a string|
|ltrim              |Remove spaces from left side of a string|
|rtrim              |Remove spaces from the right side of a string|
|lower              |Change all characters to lowercase|
|upper              |Change all characters to uppercase|

