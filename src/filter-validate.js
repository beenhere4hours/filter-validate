export class FilterValidate {

    constructor(object, config) {
        this.result = {filters: {}, validators: {}};

        this.input = {};

        this.getValue = property => {

            let result = null;

            if (this.result.filters.hasOwnProperty(property)) {
                result = this.result.filters[property];
            } else {
                result = this.input[property];
            }

            return result;
        };

        /**
         *
         * @param input
         */
        this.setFilterResult = input => {
            this.result.filters[input.property] = input.result;
        };

        this.filtersMap = {

            // remove all characters except digits
            sanitizeNumbers: (property, value) => {
                return value.replace(/\D/g, '');
            },

            // remove all characters except letters, digits, and !#$%&'*+-=?^_`{|}~@.[]
            sanitizeEmail: (property, value) => value.replace(/([^A-Z0-9!#$%&'*+\-=?^_`{|}~@.\[\]])/gi, ''),

            // remove spaces from both sides of string
            trim: (property, value) => value.trim(),

            // remove spaces from left side of string
            ltrim: (property, value) => value.trimLeft(),

            // remove spaces from right side of string
            rtrim: (property, value) => value.trimRight(),

            lower: (property, value) => value.toLowerCase(),

            upper: (property, value) => value.toUpperCase(),

        };

        this.setValidatorResult = input => {
            if (!input.result) {
                if (!this.result.validators.hasOwnProperty(input.property)) {
                    this.result.validators[input.property] = [];
                }
                this.result.validators[input.property].push(input.rule);
            }
        };

        this.validatorsMap = {
            required: (property, value) => (this.input.hasOwnProperty(property) && !['', null, undefined].includes(value)),

            validEmail: (property, value) => {
                // https://stackoverflow.com/a/14075810/1439955
                const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                return regex.test(value);
            },

            maxLen: (property, value, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                return (value.length <= len);
            },

            minLen: (property, value, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                return (value.length >= len);
            },

            exactLen: (property, value, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                return (value.length === len);
            },

            alpha: (property, value) => {
                const regex = /^[a-zA-Z]*$/;
                return regex.test(value);
            },

            alphaNumeric: (property, value) => {
                const regex = /^[a-zA-Z0-9]*$/;
                return regex.test(value);
            },

            alphaDash: (property, value) => {
                const regex = /^[a-zA-Z0-9-_]*$/;
                return regex.test(value);
            },

            alphaSpace: (property, value) => {
                const regex = /^[a-zA-Z0-9\s]*$/;
                return regex.test(value);
            },

            numeric: (property, value) => (!isNaN(value) && isFinite(value) && value != null && !Array.isArray(value) && typeof Number(value) === 'number'),

            integer: (property, value) => (value != null && !Array.isArray(value) && Number.isInteger(value)),

            float: (property, value) => {
                const regex = /^-?\d+(?:[.,]\d*?)?$/;
                return (value != null && !Array.isArray(value) && regex.test(value) && !isNaN(parseFloat(value)));
            },

            inList: (property, needle, args) => {
                let [haystack] = args;
                return (needle != null && haystack != null && haystack.split(';').map(item => item.trim().toLowerCase()).includes(needle.trim().toLowerCase()));
            },

            notInList: (property, needle, args) => {
                let [haystack] = args;
                return (needle != null && haystack != null && !haystack.split(';').map(item => item.trim().toLowerCase()).includes(needle.trim().toLowerCase()));
            },

            minNumeric: (property, value, args) => {
                let [minVal] = args;
                const regex = /^-?\d+(?:[.,]\d*?)?$/;

                return value != null &&
                    !Array.isArray(value) &&
                    regex.test(value) &&
                    regex.test(minVal) &&
                    !isNaN(parseFloat(value)) &&
                    !isNaN(parseFloat(minVal)) &&
                    isFinite(value) &&
                    parseFloat(value) >= parseFloat(minVal);
            },

            maxNumeric: (property, value, args) => {
                let [maxVal] = args;
                const regex = /^-?\d+(?:[.,]\d*?)?$/;

                return value != null &&
                    !Array.isArray(value) &&
                    regex.test(value) &&
                    regex.test(maxVal) &&
                    !isNaN(parseFloat(value)) &&
                    !isNaN(parseFloat(maxVal)) &&
                    isFinite(value) &&
                    parseFloat(value) <= parseFloat(maxVal);
            },

            date: (property, value) => {
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

                return regex.test(value);
            },

            starts: (property, value, args) => {
                let [needle, startAt] = args;

                if (typeof startAt === "string") {
                    startAt = parseInt(startAt, 10);
                } else if (startAt == null) {
                    startAt = 0;
                }

                return value != null &&
                    !Array.isArray(value) &&
                    !isNaN(parseInt(startAt, 10)) &&
                    typeof value === "string" &&
                    value.startsWith(needle, startAt);
            },

            phone: (property, value) => {
                // '1234567890'
                // 1234567890
                // '(078)789-8908'
                // '123-345-3456'
                const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                return regex.test(value);
            },

            regex: (property, value, args) => {
                let [regex] = args;
                let regExp = new RegExp(regex);
                return !['', null].includes(value) && !Array.isArray(value) && regExp.test(value);
            },

        };

        this.setup = object => {
            this.result = {filters: {}, validators: {}};
            this.input = {};
            this.input = {...object};
        };

        if (config != undefined) {
            this.setup(object);

            if (config.hasOwnProperty('filters')) {
                this.parse(this.setFilterResult, this.filtersMap, config.filters);
            }

            if (config.hasOwnProperty('validators')) {
                this.parse(this.setValidatorResult, this.validatorsMap, config.validators);
            }

            return this.result;
        }
    }

    /**
     *
     * @param {function} setResult
     * @param {*} map
     * @param {*} requestedRules
     */
    parse(setResult, map, requestedRules) {

        for (const [property, rules] of Object.entries(requestedRules)) {

            if (typeof rules === 'string') {
                rules.split('|')
                    .filter(segment => segment !== '') // remove any rules that came across as empty
                    .forEach(segment => {
                        const [rule, ...args] = segment.split(',').map(segment => segment.trim());
                        const result = {
                            property: property,
                            result: map[rule](property, this.getValue(property), args),
                            rule: rule,
                        };

                        setResult(result);
                    });
            }
        }
    }

    /**
     * Applies the validators to the input object
     * @param {*} object the input to validate
     * @param {*} validators the rules to apply as validation
     * @returns {FilterValidate.result.validators|{}}
     */
    validate(object = {}, validators = {}) {
        if (Object.prototype.toString.call(object) === '[object Object]' && Object.prototype.toString.call(validators) === '[object Object]') {
            this.setup(object);
            this.parse(this.setValidatorResult, this.validatorsMap, validators);
        }
        return this.result.validators;
    }

    /**
     * Transforms the values of object properties based on the passed filters
     * @param {*} object the input to transform
     * @param {*} filters the rules to apply as transformations
     * @returns {FilterValidate.result.filters|{}} the transformed values
     */
    filter(object = {}, filters = {}) {
        if (Object.prototype.toString.call(object) === '[object Object]' && Object.prototype.toString.call(filters) === '[object Object]') {
            this.setup(object);
            this.parse(this.setFilterResult, this.filtersMap, filters);
        }
        return this.result.filters;
    }

    /**
     * Adds a function to be mapped to by name
     * @param {string} name of the filter
     * @param {function} filter the function to be added
     */
    addFilter(name, filter) {
        if (typeof filter === 'function') {
            this.filtersMap[name] = filter;
        }
    }

    /**
     * Adds a function to be mapped to by name
     * @param {string} name of the validator
     * @param {function} validator the function to be added
     */
    addValidator(name, validator) {
        if (typeof validator === 'function') {
            this.validatorsMap[name] = validator;
        }
    }

}

// module.exports = FilterValidate;
