[![Build Status](https://travis-ci.org/beenhere4hours/valid-chain.svg?branch=master)](https://travis-ci.org/beenhere4hours/valid-chain)

valid-chain
=====

Verify deep nested property exists

## Installation
`npm i @beenhere4hours/valid-chain`

## Usage

```
const validChain = require("../index").validChain;

// first param is the object to search
// second param is a string dot notated list of params to be verified
validChain({level1: {level2: {level3: {level4: true}}}}, 'level1.level2.level3.level4');
// expect true

validChain({level1: {level2: {level3: {level4: true}}}}, 'level1.level2.level3.level4.level5');
// expect false

```

## Tests

  `npm test`
