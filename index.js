let result = {};

let input = {};

const initProperty = property => {
    if (!result.hasOwnProperty(property)) {
        result[property] = [];
    }
};

let filtersMap = {
    // remove all characters except digits
    sanitizeNumbers: property => result.sanitizeNumbers = input[property].replace(/\D/g, ''),

    // remove all characters except letters, digits, and !#$%&'*+-=?^_`{|}~@.[]
    sanitizeEmail: property => result.sanitizeEmail = input[property].replace(/([^A-Z0-9!#$%&'*+\-=?^_`{|}~@.\[\]])/gi, ''),

    // remove spaces from both sides of string
    trim: property => result.trim = input[property].trim(),

    // remove spaces from left side of string
    ltrim: property => result.ltrim = input[property].trimStart(),

    // remove spaces from right side of string
    rtrim: property => result.rtrim = input[property].trimEnd(),
};

let validatorsMap = {
    required: property => {
        let tests = [
            !input.hasOwnProperty(property),
            ['', null, undefined].includes(input[property]),
        ];

        tests.some(test => {
            if (test) {
                initProperty(property);
                result[property].push('required');
            }
        });
    },

    validEmail: property => {
        // https://stackoverflow.com/a/14075810/1439955
        const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        if (regex.test(input[property]) === false) {
            initProperty(property);
            result[property].push('validEmail');
        }
    },

    maxLen: (property, args) => {
        let [len] = args;

        if (typeof len === 'string') {
            len = parseInt(len, 10);
        }

        if (input[property].length > len) {
            initProperty(property);
            result[property].push('maxLen');
        }
    },

    minLen: (property, args) => {
        let [len] = args;

        if (typeof len === 'string') {
            len = parseInt(len, 10);
        }

        if (input[property].length < len) {
            initProperty(property);
            result[property].push('minLen');
        }
    },

    exactLen: (property, args) => {
        let [len] = args;

        if (typeof len === 'string') {
            len = parseInt(len, 10);
        }

        if (input[property].length !== len) {
            initProperty(property);
            result[property].push('exactLen');
        }
    },

    alpha: property => {
        const regex = /^[a-zA-Z]*$/;

        if (regex.test(input[property]) === false) {
            initProperty(property);
            result[property].push('alpha');
        }
    },

    alphaNumeric: property => {
        const regex = /^[a-zA-Z0-9]*$/;

        if (regex.test(input[property]) === false) {
            initProperty(property);
            result[property].push('alphaNumeric');
        }
    },

    alphaDash: property => {
        const regex = /^[a-zA-Z0-9-_]*$/;

        if (regex.test(input[property]) === false) {
            initProperty(property);
            result[property].push('alphaDash');
        }
    },

    alphaSpace: property => {
        const regex = /^[a-zA-Z0-9\s]*$/;

        if (regex.test(input[property]) === false) {
            initProperty(property);
            result[property].push('alphaSpace');
        }
    },

    numeric: property => {
        if (isNaN(input[property]) || !isFinite(input[property]) || input[property] == null || Array.isArray(input[property] || typeof input[property !== 'number'])) {
            initProperty(property);
            result[property].push('numeric');
        }
    },

    integer: property => {
        if (!Number.isInteger(input[property]) || input[property] == null || Array.isArray(input[property])) {
            initProperty(property);
            result[property].push('integer');
        }
    },

    float: property => {
        const regex = /^-?\d+(?:[.,]\d*?)?$/;

        let tests = [
            input[property] == null,
            Array.isArray(input[property]),
            !regex.test(input[property]),
            isNaN(parseFloat(input[property])),
        ];

        tests.some(test => {
            if (test) {
                initProperty(property);
                result[property].push('float');
            }
        });
    },

    containedInList: (needle, args) => {
        let [haystack] = args;

        let hasValue = false;

        if (input[needle] != null && haystack != null) {
            hasValue = haystack.split(';').map(item => item.trim().toLowerCase()).includes(input[needle].trim().toLowerCase());
        }

        if (!hasValue) {
            initProperty(needle);
            result[needle].push('containedInList');
        }
    },

    notContainedInList: (needle, args) => {
        let [haystack] = args;

        let hasValue = false;

        if (input[needle] != null && haystack != null) {
            hasValue = haystack.split(';').map(item => item.trim().toLowerCase()).includes(input[needle].trim().toLowerCase());
        }

        if (hasValue) {
            initProperty(needle);
            result[needle].push('notContainedInList');
        }
    },

    minNumeric: (property, args) => {
        let [val] = args;

        const regex = /^-?\d+(?:[.,]\d*?)?$/;

        let tests = [
            input[property] == null,
            Array.isArray(input[property]),
            !regex.test(input[property]),
            !regex.test(val),
            isNaN(parseFloat(input[property])),
            isNaN(parseFloat(val)),
            !isFinite(input[property]),
            parseFloat(val) > parseFloat(input[property])
        ];

        tests.some(test => {
            if (test) {
                initProperty(property);
                result[property].push('minNumeric');
            }
        });
    },

    maxNumeric: (property, args) => {
        let [val] = args;

        const regex = /^-?\d+(?:[.,]\d*?)?$/;

        let tests = [
            input[property] == null,
            Array.isArray(input[property]),
            !regex.test(input[property]),
            !regex.test(val),
            isNaN(parseFloat(input[property])),
            isNaN(parseFloat(val)),
            !isFinite(input[property]),
            parseFloat(input[property]) > parseFloat(val),
        ];

        tests.some(test => {
            if (test) {
                initProperty(property);
                result[property].push('minNumeric');
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

        if (regex.test(input[property]) === false) {
            initProperty(property);
            result[property].push('date');
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
            input[property] == null,
            Array.isArray(input[property]),
            isNaN(parseInt(val, 10)),
            typeof input[property] === "string" && !input[property].startsWith(needle, val)
        ];

        tests.some(test => {
            if (test) {
                initProperty(property);
                result[property].push('starts');
            }
        });
    },

    phone: property => {
        // '1234567890'
        // 1234567890
        // '(078)789-8908'
        // '123-345-3456'
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (regex.test(input[property]) === false) {
            initProperty(property);
            result[property].push('phone');
        }
    },

    regex: (property, args) => {
        let [regex] = args;
        let regExp = new RegExp(regex);

        let tests = [
            input[property] === '',
            input[property] == null,
            Array.isArray(input[property]),
            regExp.test(input[property]) === false
        ];

        tests.some(test => {
            if (test) {
                initProperty(property);
                result[property].push('regex');
            }
        });
    },

};

const test = (map, object = {}, items = []) => {
    result = {};
    input = {};
    // make a shallow copy of the input
    input = {...object};

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
};

exports.filterValidate = {

    validate: (object, validators = []) => {
        test(validatorsMap, object, validators);
        return result;
    },

    filter: (object = {}, filters = []) => {
        test(filtersMap, object, filters);
        return result;
    }
};