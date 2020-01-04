/**
 * Write something meaningful here later
 * @param object {object} stuff
 * @param validators {array <object>} stuff
 * @param filters {array <object>} stuff
 * @returns {object}
 */
exports.filterValidate = function(object, validators = [], filters = []) {
    let result  = {
        validators: {
            failed: {}
        },
        filters: {}
    };

    let initProperty = (property) => {
        if (!result.validators.failed.hasOwnProperty(property)) {
            result.validators.failed[property] = [];
        }
    };

    let validatorsMap = {
        required: property => {
            let tests = [
                !object.hasOwnProperty(property),
                ['', null, undefined].includes(object[property]),
            ];

            tests.some(test => {
                if (test) {
                    initProperty(property);
                    result.validators.failed[property].push('required');
                }
            });
        },

        validEmail: property => {
            const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

            if (regex.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('validEmail');
            }
        },

        maxLen: (property, args) => {
            let [len] = args;

            if (typeof len === 'string') {
                len = parseInt(len, 10);
            }

            if (object[property].length > len) {
                initProperty(property);
                result.validators.failed[property].push('maxLen');
            }
        },

        minLen: (property, args) => {
            let [len] = args;

            if (typeof len === 'string') {
                len = parseInt(len, 10);
            }

            if (object[property].length < len) {
                initProperty(property);
                result.validators.failed[property].push('minLen');
            }
        },

        exactLen: (property, args) => {
            let [len] = args;

            if (typeof len === 'string') {
                len = parseInt(len, 10);
            }

            if (object[property].length !== len) {
                initProperty(property);
                result.validators.failed[property].push('exactLen');
            }
        },

        alpha: property => {
            const regex = /^[a-zA-Z]*$/;

            if (regex.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('alpha');
            }
        },

        alphaNumeric: property => {
            const regex = /^[a-zA-Z0-9]*$/;

            if (regex.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('alphaNumeric');
            }
        },

        alphaDash: property => {
            const regex = /^[a-zA-Z0-9-_]*$/;

            if (regex.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('alphaDash');
            }
        },

        alphaSpace: property => {
            const regex = /^[a-zA-Z0-9\s]*$/;

            if (regex.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('alphaSpace');
            }
        },

        numeric: property => {
            if (isNaN(object[property]) || !isFinite(object[property]) || object[property] == null || Array.isArray(object[property])) {
                initProperty(property);
                result.validators.failed[property].push('numeric');
            }
        },

        integer: property => {
            if (!Number.isInteger(object[property]) || object[property] == null || Array.isArray(object[property])) {
                initProperty(property);
                result.validators.failed[property].push('integer');
            }
        },

        float: property => {
            const regex = /^-?\d+(?:[.,]\d*?)?$/;

            let tests = [
                object[property] == null,
                Array.isArray(object[property]),
                !regex.test(object[property]),
                isNaN(parseFloat(object[property])),
            ];

            tests.some(test => {
                if (test) {
                    initProperty(property);
                    result.validators.failed[property].push('float');
                }
            });
        },

        containedInList: (needle, args) => {
            let [haystack] = args;

            let hasValue = false;

            if (object[needle] != null && haystack != null) {
                hasValue = haystack.split(';').map(item => item.trim().toLowerCase()).includes(object[needle].trim().toLowerCase());
            }

            if (!hasValue) {
                initProperty(needle);
                result.validators.failed[needle].push('containedInList');
            }
        },

        notContainedInList: (needle, args) => {
            let [haystack] = args;

            let hasValue = false;

            if (object[needle] != null && haystack != null) {
                hasValue = haystack.split(';').map(item => item.trim().toLowerCase()).includes(object[needle].trim().toLowerCase());
            }

            if (hasValue) {
                initProperty(needle);
                result.validators.failed[needle].push('notContainedInList');
            }
        },

        minNumeric: (property, args) => {
            let [val] = args;

            const regex = /^-?\d+(?:[.,]\d*?)?$/;

            let tests = [
                object[property] == null,
                Array.isArray(object[property]),
                !regex.test(object[property]),
                !regex.test(val),
                isNaN(parseFloat(object[property])),
                isNaN(parseFloat(val)),
                !isFinite(object[property]),
                parseFloat(val) > parseFloat(object[property])
            ];

            tests.some(test => {
                if (test) {
                    initProperty(property);
                    result.validators.failed[property].push('minNumeric');
                }
            });
        },

        maxNumeric: (property, args) => {
            let [val] = args;

            const regex = /^-?\d+(?:[.,]\d*?)?$/;

            let tests = [
                object[property] == null,
                Array.isArray(object[property]),
                !regex.test(object[property]),
                !regex.test(val),
                isNaN(parseFloat(object[property])),
                isNaN(parseFloat(val)),
                !isFinite(object[property]),
                parseFloat(object[property]) > parseFloat(val),
            ];

            tests.some(test => {
                if (test) {
                    initProperty(property);
                    result.validators.failed[property].push('minNumeric');
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

            if (regex.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('date');
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
                object[property] == null,
                Array.isArray(object[property]),
                isNaN(parseInt(val, 10)),
                typeof object[property] === "string" && !object[property].startsWith(needle, val)
            ];

            tests.some(test => {
                if (test) {
                    initProperty(property);
                    result.validators.failed[property].push('starts');
                }
            });
        },

        phone: property => {
            // '1234567890'
            // 1234567890
            // '(078)789-8908'
            // '123-345-3456'
            const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

            if (regex.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('phone');
            }
        },

        regex: (property, args) => {
            let [regex] = args;
            let regExp = new RegExp(regex);

            let tests = [
                object[property] === '',
                object[property] == null,
                Array.isArray(object[property]),
                regExp.test(object[property]) === false
            ];

            tests.some(test => {
                if (test) {
                    initProperty(property);
                    result.validators.failed[property].push('regex');
                }
            });
        },

    };

    if (Array.isArray(validators)) {
        validators.forEach(validator => {
            for (let [property, rules] of Object.entries(validator)) {
                // console.log(`validator ${property}: ${rules}`);

                rules.split('|').forEach(segment => {
                    let [rule, ...args] = segment.split(',').map(segment => segment.trim());
                    validatorsMap[rule](property, args);
                });
            }
        });
    }

    let filtersMap = {
        sanitizeNumbers: property => result.filters.sanitizeNumbers = object[property].replace(/\D/g, '')
    };


    if (Array.isArray(filters)) {
        filters.forEach(filter => {
            for (let [property, rules] of Object.entries(filter)) {
                // console.log(`filter ${property}: ${rules}`);

                rules.split('|').forEach(segment => {
                    let [rule, ...args] = segment.split(',').map(segment => segment.trim());
                    filtersMap[rule](property, args);
                });
            }
        });
    }

    return result;
};
