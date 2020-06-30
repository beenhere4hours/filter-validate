[![Build Status](https://travis-ci.org/beenhere4hours/filter-validate.svg?branch=master)](https://travis-ci.org/beenhere4hours/filter-validate)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@beenhere4hours/filter-validate)
![npm (scoped)](https://img.shields.io/npm/v/@beenhere4hours/filter-validate)


filter-validate
=====
An object validation utility.

## Usage

#### Example for usage from NPM

Below, the [@std/esm](https://github.com/standard-things/esm) package lets us use ES modules in Node.js v6+.

```
npm i @beenhere4hours/filter-validate
npm i @std/esm
```

In the package.json we're loading the esm module for the local run and enabling cjs in the esm field.

package.json
```
{
  "name": "example",
  "version": "0.0.0",
  "description": "example of how to use filter-validate with esm",
  "main": "index.js",
  "scripts": {
    "dev": "node -r esm index.js",
  },
  "dependencies": {
    "@beenhere4hours/filter-validate": "^0.3.14",
    "esm": "^3.2.25"
  },
  "esm": {
    "cjs": true
  }
}
```

index.js
```
import {FilterValidate} from "@beenhere4hours/filter-validate";

const filterValidate = new FilterValidate();

// Example 1 - a single validator
const example1Rules = {test: 'maxLen, 7'};
const example1Object = {test: '12345'};
const example1Result = filterValidate.validate(example1Object, example1Rules);
console.log(`result will be {} as the string length is valid`);
console.log(example1Result);

// Example 2 - a single filter
const example2Rules = {test: 'sanitizeNumbers'};
const example2Object = {test: 'abc123'};
const example2Result = filterValidate.filter(example2Object, example2Rules);
console.log(`result will be {test: "123"} as the returned input is transformed`);
console.log(example2Result);

// Example 3 - multiple validators
const example3Rules = {test: 'alpha|minLen, 3|maxLen, 6'};
const example3Object = {test: 'abcABC'};
const example3Result = filterValidate.validate(example3Object, example3Rules);
console.log(`result will be {} as the string length is between 3 and 6 and characters are alpha. a-z A-Z`);
console.log(example3Result);

// Example 4 - multiple filters
const example4Rules = {test: 'ltrim|rtrim|upper'};
const example4Object = {test: '   abcDEFghi   '};
const example4Result = filterValidate.filter(example4Object, example4Rules);
console.log(`result will be {test: "ABCDEFGHI"}`);
console.log(example4Result);

// Example 5 - passing an object to the constructor
const example5Filters = {test: 'ltrim|rtrim|upper'};
const example5Validators = {test: 'alpha|minLen, 3'};
const example5Config = {filters: example5Filters, validators: example5Validators};
const example5Object = {test: '   abc   '};
const example5Result = new FilterValidate(example5Object, example5Config);
console.log(`result will be {filters:{test: "ABC"}, validators: {} }`);
console.log(example5Result);

```

#### Example for usage in browser
```html
<script type="module">
    import {FilterValidate} from "https://cdn.jsdelivr.net/npm/@beenhere4hours/filter-validate@0.3.14/src/filter-validate.min.js";

    const filterValidate = new FilterValidate();

    // Example 1 - a single validator
    const example1Rules = {test: 'maxLen, 7'};
    const example1Object = {test: '12345'};
    const example1Result = filterValidate.validate(example1Object, example1Rules);
    console.log(`result will be {} as the string length is valid`);
    console.log(example1Result);

    // Example 2 - a single filter
    const example2Rules = {test: 'sanitizeNumbers'};
    const example2Object = {test: 'abc123'};
    const example2Result = filterValidate.filter(example2Object, example2Rules);
    console.log(`result will be {test: "123"} as the returned input is transformed`);
    console.log(example2Result);

    // Example 3 - multiple validators
    const example3Rules = {test: 'alpha|minLen, 3|maxLen, 6'};
    const example3Object = {test: 'abcABC'};
    const example3Result = filterValidate.validate(example3Object, example3Rules);
    console.log(`result will be {} as the string length is between 3 and 6 and characters are alpha. a-z A-Z`);
    console.log(example3Result);

    // Example 4 - multiple filters
    const example4Rules = {test: 'ltrim|rtrim|upper'};
    const example4Object = {test: '   abcDEFghi   '};
    const example4Result = filterValidate.filter(example4Object, example4Rules);
    console.log(`result will be {test: "ABCDEFGHI"}`);
    console.log(example4Result);

    // Example 5 - passing an object to the constructor
    const example5Filters = {test: 'ltrim|rtrim|upper'};
    const example5Validators = {test: 'alpha|minLen, 3'};
    const example5Config = {filters: example5Filters, validators: example5Validators};
    const example5Object = {test: '   abc   '};
    const example5Result = new FilterValidate(example5Object, example5Config);
    console.log(`result will be {filters:{test: "ABC"}, validators: {} }`);
    console.log(example5Result);

</script>
```

## Tests

  `npm test`

## Available Validators
##### required
Specified key/value pair exists and that the value is not an empty string '', null, or undefined

##### validEmail
Value is valid formatted email address.

This should cover most of the **RFC 822** and **RFC 5322** specifications.

Below are examples of accepted formats:
* `test@gmail.com`
* `test.test@gmail.com`
* `test.with+symbol@gmail.com`
* `test.with-symbol@gmail.com`
* `x@gmail.com`
* `"this.is.awkward@awkward.com"@gmail.com`
* `"very.(),:;<>[]\".VERY.\"very@\ \"very\".unusual@gmail.com`
* `/#!$%&'*+-/=?^_`{}|~@gmail.com`
* ``` "()<>[]:,;@\\"!#$%&'-/=?^_`{}|~.a"@example.org ```

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

examples of valid numbers:

|number|description|
|------|-----------|
|0b101010|binary|
|42.0|float|
|0x2A|hex / base 16|
|42|integer|
|0o2471|octal|
|"42"|string without thousands or decimal separator|


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

## Kudos
Andre Torgal for his [esm nyc mocha boilerplate](https://github.com/andrezero/boilerplate-esm-nyc-mocha)
