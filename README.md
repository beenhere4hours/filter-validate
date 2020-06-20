[![Build Status](https://travis-ci.org/beenhere4hours/filter-validate.svg?branch=master)](https://travis-ci.org/beenhere4hours/filter-validate)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@beenhere4hours/filter-validate)
![npm (scoped)](https://img.shields.io/npm/v/@beenhere4hours/filter-validate)


filter-validate
=====
Is an object validation utility.

## Install

### From CDN

### From NPM
`npm i @beenhere4hours/filter-validate`

```
const filterValidate = require("../src/filter-validate");
```

## Usage


## Tests

  `npm test`
  
## Available Validators
##### required
Specified key/value pair exists and that the value is not an empty string '', null, or undefined

##### validEmail
Value is valid formatted email address

referenced from [stackoverflow](https://stackoverflow.com/a/14075810/1439955) answer

examples of accepted formats:
* test@gmail.com
* test.test@gmail.com
* test.with+symbol@gmail.com
* test.with-symbol@gmail.com
* x@gmail.com
* "this.is.awkward@awkward.com"@gmail.com
* "very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual@gmail.com
* /#!$%&'*+-/=?^_`{}|~@gmail.com
* "()<>[]:,;@\\"!#$%&'-/=?^_`{}|~.a"@example.org

##### maxLen, n
Value length is not greater than length given as n

##### minLen, n
Value length is not less than length given as n

##### exactLen, n
Value length is equal to length given as n

##### alpha
Only alpha characters (a-z, A-Z) are present in the value

##### alphaNumeric
Only alpha-numeric characters, (a-z, A-Z, 0-9), are present in the value

##### alphaDash
Only alpha-numeric characters, dashes, and underscores are present in the value (a-z, A-Z, 0-9, _-)

##### alphaSpace
Only alpha-numeric characters and spaces, (a-z, A-Z, 0-9, \s), are present in the value

##### numeric
Value is numeric

##### integer
Value is an integer

##### float
Value is a float

##### inList, needle, haystack
Value is contained within the semicolon separated list

##### notInList, needle, haystack
Value is not contained within the semicolon separated list

##### minNumeric, n
Value is greater than or equal to minimum given as n

##### maxNumeric, n
Value is less than or equal to maximum given as n

##### date
Value is a date compliant with ISO 8601

examples of valid date formats:
* 1997
* 1997-07
* 1997-07-16
* 1997-07-16T19:20+01:00
* 1997-07-16T19:20+01:00Z
* 1997-07-16T19:20-01:00
* 1997-07-16T19:20-01:00Z
* 1997-07-16T19:20:30+01:00
* 1997-07-16T19:20:30+01:00Z
* 1997-07-16T19:20:30.45+01:00
* 1997-07-16T19:20:30.45+01:00Z
* 1997-07-16T19:20:30.45-01:00
* 1997-07-16T19:20:30.45-01:00Z
* 1997-13-39T19:58:30.45-01:00Z
* -1997-13-39T19:58:30.45-01:00Z

##### starts, needle, n
Value starts with a character/set of characters starting at a given position

##### phone
Value is a phone number that matches one of the following patterns
* 1234567890
* "1234567890"
* "(078)789-8908"
* "123-345-3456"

##### regex, pattern
Value passes provided regex validation

## Available Filters

##### sanitizeNumbers
Remove any non-numeric characters

##### sanitizeEmail
Remove illegal characters from email addresses

##### trim
Remove spaces from both sides of a string

##### ltrim
Remove spaces from left side of a string

##### rtrim
Remove spaces from the right side of a string

##### lower
Change all characters to lowercase

##### upper
Change all characters to uppercase
