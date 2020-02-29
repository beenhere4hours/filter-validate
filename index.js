class FilterValidate {

    constructor() {
        this.result = {};

        this.input = {};

        this.initProperty = (property) => {
            if (!this.result.hasOwnProperty(property)) {
                this.result[property] = [];
            }
        };

        this.filtersMap = {
            // remove all characters except digits
            sanitizeNumbers: property => this.result.sanitizeNumbers = this.input[property].replace(/\D/g, ''),

            // remove all characters except letters, digits, and !#$%&'*+-=?^_`{|}~@.[]
            sanitizeEmail: property => this.result.sanitizeEmail = this.input[property].replace(/([^A-Z0-9!#$%&'*+\-=?^_`{|}~@.\[\]])/gi, ''),

            // remove spaces from both sides of string
            trim: property => this.result.trim = this.input[property].trim(),

            // remove spaces from left side of string
            ltrim: property => this.result.ltrim = this.input[property].trimStart(),

            // remove spaces from right side of string
            rtrim: property => this.result.rtrim = this.input[property].trimEnd(),
        };

        this.validatorsMap = {
            required: property => {
                let tests = [
                    !this.input.hasOwnProperty(property),
                    ['', null, undefined].includes(this.input[property]),
                ];

                tests.some(test => {
                    if (test) {
                        this.initProperty(property);
                        this.result[property].push('required');
                    }
                });
            },

            validEmail: property => {
                // https://stackoverflow.com/a/14075810/1439955
                const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

                if (regex.test(this.input[property]) === false) {
                    this.initProperty(property);
                    this.result[property].push('validEmail');
                }
            },

            maxLen: (property, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                if (this.input[property].length > len) {
                    this.initProperty(property);
                    this.result[property].push('maxLen');
                }
            },

            minLen: (property, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                if (this.input[property].length < len) {
                    this.initProperty(property);
                    this.result[property].push('minLen');
                }
            },

            exactLen: (property, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                if (this.input[property].length !== len) {
                    this.initProperty(property);
                    this.result[property].push('exactLen');
                }
            },

            alpha: property => {
                const regex = /^[a-zA-Z]*$/;

                if (regex.test(this.input[property]) === false) {
                    this.initProperty(property);
                    this.result[property].push('alpha');
                }
            },

            alphaNumeric: property => {
                const regex = /^[a-zA-Z0-9]*$/;

                if (regex.test(this.input[property]) === false) {
                    this.initProperty(property);
                    this.result[property].push('alphaNumeric');
                }
            },

            alphaDash: property => {
                const regex = /^[a-zA-Z0-9-_]*$/;

                if (regex.test(this.input[property]) === false) {
                    this.initProperty(property);
                    this.result[property].push('alphaDash');
                }
            },

            alphaSpace: property => {
                const regex = /^[a-zA-Z0-9\s]*$/;

                if (regex.test(this.input[property]) === false) {
                    this.initProperty(property);
                    this.result[property].push('alphaSpace');
                }
            },

            numeric: property => {
                if (isNaN(this.input[property]) || !isFinite(this.input[property]) || this.input[property] == null || Array.isArray(this.input[property] || typeof this.input[property !== 'number'])) {
                    this.initProperty(property);
                    this.result[property].push('numeric');
                }
            },

            integer: property => {
                if (!Number.isInteger(this.input[property]) || this.input[property] == null || Array.isArray(this.input[property])) {
                    this.initProperty(property);
                    this.result[property].push('integer');
                }
            },

            float: property => {
                const regex = /^-?\d+(?:[.,]\d*?)?$/;

                let tests = [
                    this.input[property] == null,
                    Array.isArray(this.input[property]),
                    !regex.test(this.input[property]),
                    isNaN(parseFloat(this.input[property])),
                ];

                tests.some(test => {
                    if (test) {
                        this.initProperty(property);
                        this.result[property].push('float');
                    }
                });
            },

            containedInList: (needle, args) => {
                let [haystack] = args;

                let hasValue = false;

                if (this.input[needle] != null && haystack != null) {
                    hasValue = haystack.split(';').map(item => item.trim().toLowerCase()).includes(this.input[needle].trim().toLowerCase());
                }

                if (!hasValue) {
                    this.initProperty(needle);
                    this.result[needle].push('containedInList');
                }
            },

            notContainedInList: (needle, args) => {
                let [haystack] = args;

                let hasValue = false;

                if (this.input[needle] != null && haystack != null) {
                    hasValue = haystack.split(';').map(item => item.trim().toLowerCase()).includes(this.input[needle].trim().toLowerCase());
                }

                if (hasValue) {
                    this.initProperty(needle);
                    this.result[needle].push('notContainedInList');
                }
            },

            minNumeric: (property, args) => {
                let [val] = args;

                const regex = /^-?\d+(?:[.,]\d*?)?$/;

                let tests = [
                    this.input[property] == null,
                    Array.isArray(this.input[property]),
                    !regex.test(this.input[property]),
                    !regex.test(val),
                    isNaN(parseFloat(this.input[property])),
                    isNaN(parseFloat(val)),
                    !isFinite(this.input[property]),
                    parseFloat(val) > parseFloat(this.input[property])
                ];

                tests.some(test => {
                    if (test) {
                        this.initProperty(property);
                        this.result[property].push('minNumeric');
                    }
                });
            },

            maxNumeric: (property, args) => {
                let [val] = args;

                const regex = /^-?\d+(?:[.,]\d*?)?$/;

                let tests = [
                    this.input[property] == null,
                    Array.isArray(this.input[property]),
                    !regex.test(this.input[property]),
                    !regex.test(val),
                    isNaN(parseFloat(this.input[property])),
                    isNaN(parseFloat(val)),
                    !isFinite(this.input[property]),
                    parseFloat(this.input[property]) > parseFloat(val),
                ];

                tests.some(test => {
                    if (test) {
                        this.initProperty(property);
                        this.result[property].push('minNumeric');
                    }
                });
            },

            date: property => {
                // regex from https://regexr.com/3e0lh
                // should support the following formats
                // 1997
                // 1997-07
                // 1997-07-16
                // 1997-07-16T19:20+01:00
                // 1997-07-16T19:20+01:00Z
                // 1997-07-16T19:20-01:00
                // 1997-07-16T19:20-01:00Z
                // 1997-07-16T19:20:30+01:00
                // 1997-07-16T19:20:30+01:00Z
                // 1997-07-16T19:20:30.45+01:00
                // 1997-07-16T19:20:30.45+01:00Z
                // 1997-07-16T19:20:30.45-01:00
                // 1997-07-16T19:20:30.45-01:00Z
                // 1997-13-39T19:58:30.45-01:00Z
                const regex = /[+-]?\d{4}(-[01]\d(-[0-3]\d(T[0-2]\d:[0-5]\d:?([0-5]\d(\.\d+)?)?[+-][0-2]\d:[0-5]\dZ?)?)?)?/;

                if (regex.test(this.input[property]) === false) {
                    this.initProperty(property);
                    this.result[property].push('date');
                }
            },

            starts: (property, args) => {
                let [needle, val] = args;

                if (typeof val === "string") {
                    val = parseInt(val, 10);
                } else if (val == null) {
                    val = 0;
                }

                let tests = [
                    this.input[property] == null,
                    Array.isArray(this.input[property]),
                    isNaN(parseInt(val, 10)),
                    typeof this.input[property] === "string" && !this.input[property].startsWith(needle, val)
                ];

                tests.some(test => {
                    if (test) {
                        this.initProperty(property);
                        this.result[property].push('starts');
                    }
                });
            },

            phone: property => {
                // '1234567890'
                // 1234567890
                // '(078)789-8908'
                // '123-345-3456'
                const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

                if (regex.test(this.input[property]) === false) {
                    this.initProperty(property);
                    this.result[property].push('phone');
                }
            },

            regex: (property, args) => {
                let [regex] = args;
                let regExp = new RegExp(regex);

                let tests = [
                    this.input[property] === '',
                    this.input[property] == null,
                    Array.isArray(this.input[property]),
                    regExp.test(this.input[property]) === false
                ];

                tests.some(test => {
                    if (test) {
                        this.initProperty(property);
                        this.result[property].push('regex');
                    }
                });
            },

        };
    }

    parse(map, object = {}, items = []) {
        this.result = {};
        this.input = {};
        // make a shallow copy of the input
        this.input = {...object};

        if (Object.prototype.toString.call(object) === '[object Object]' && Array.isArray(items)) {
            items.forEach(item => {
                for (let [property, rules] of Object.entries(item)) {
                    // console.log(`property: ${property} rules: ${rules}`);

                    if (typeof rules === 'string') {
                        rules.split('|').forEach(segment => {
                            let [rule, ...args] = segment.split(',').map(segment => segment.trim());
                            map[rule](property, args);
                        });
                    }
                }
            });
        }
    }

    validate(object, validators = []) {
        this.parse(this.validatorsMap, object, validators);
        return this.result;
    }

    filter(object = {}, filters = []) {
        this.parse(this.filtersMap, object, filters);
        return this.result;
    }

}

module.exports = FilterValidate;