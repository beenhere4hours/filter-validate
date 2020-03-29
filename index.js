class FilterValidate {

    constructor(object, config) {
        this.result = {filters: {}, validators: {}};

        this.input = {};

        this.getValue = property => {
            console.log(`[getValue] property: ${property}`);

            let result = null;

            if (this.result.filters.hasOwnProperty(property)) {
                result = this.result.filters[property];
                console.log(`[getValue] pull from result.filters: ${result}`);
            } else {
                result = this.input[property];
                console.log(`[getValue] pull from input: ${result}`);
            }

            return result;
        };

        /**
         *
         * @param input
         */
        this.setFilterResult = input => {
            console.log(`[setFilterResult] value:`);
            console.log(input);
            this.result.filters[input.property] = input.result;
        };

        this.filtersMap = {

            // remove all characters except digits
            sanitizeNumbers: value => {
                console.log(`[filtersMap] value: ${value}`);
                return value.replace(/\D/g, '');
            },

            // remove all characters except letters, digits, and !#$%&'*+-=?^_`{|}~@.[]
            sanitizeEmail: value => value.replace(/([^A-Z0-9!#$%&'*+\-=?^_`{|}~@.\[\]])/gi, ''),

            // remove spaces from both sides of string
            trim: value => value.trim(),

            // remove spaces from left side of string
            ltrim: value => value.trimLeft(),

            // remove spaces from right side of string
            rtrim: value => value.trimRight(),

            lower: value => value.toLowerCase(),

            upper: value => value.toUpperCase(),

        };

        this.setValidatorResult = (property, rule) => {
            if (!this.result.validators.hasOwnProperty(property)) {
                this.result.validators[property] = [];
            }
            this.result.validators[property].push(rule);
        };

        this.validatorsMap = {
            required: value => !this.input.hasOwnProperty(value) || ['', null, undefined].includes(this.input[value]),

            validEmail: property => {
                // https://stackoverflow.com/a/14075810/1439955
                const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

                if (regex.test(this.getValue(property)) === false) {
                    this.setValidatorResult(property, 'validEmail');
                }
            },

            maxLen: (property, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                if (this.getValue(property).length > len) {
                    this.setValidatorResult(property, 'maxLen');
                }
            },

            minLen: (property, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                if (this.getValue(property).length < len) {
                    this.setValidatorResult(property, 'minLen');
                }
            },

            exactLen: (property, args) => {
                let [len] = args;

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                if (this.getValue(property).length !== len) {
                    this.setValidatorResult(property, 'exactLen');
                }
            },

            alpha: property => {
                const regex = /^[a-zA-Z]*$/;

                if (regex.test(this.getValue(property)) === false) {
                    this.setValidatorResult(property, 'alpha');
                }
            },

            alphaNumeric: property => {
                const regex = /^[a-zA-Z0-9]*$/;

                if (regex.test(this.getValue(property)) === false) {
                    this.setValidatorResult(property, 'alphaNumeric');
                }
            },

            alphaDash: property => {
                const regex = /^[a-zA-Z0-9-_]*$/;

                if (regex.test(this.getValue(property)) === false) {
                    this.setValidatorResult(property, 'alphaDash');
                }
            },

            alphaSpace: property => {
                const regex = /^[a-zA-Z0-9\s]*$/;

                if (regex.test(this.getValue(property)) === false) {
                    this.setValidatorResult(property, 'alphaSpace');
                }
            },

            numeric: property => {
                const input = this.getValue(property);

                if (isNaN(input) || !isFinite(input) || input == null || Array.isArray(input) || typeof Number(input) !== 'number') {
                    this.setValidatorResult(property, 'numeric');
                }
            },

            integer: property => {
                const input = this.getValue(property);

                if (!Number.isInteger(input) || input == null || Array.isArray(input)) {
                    this.setValidatorResult(property, 'integer');
                }
            },

            float: property => {
                const regex = /^-?\d+(?:[.,]\d*?)?$/;
                const input = this.getValue(property);

                let tests = [
                    input == null,
                    Array.isArray(input),
                    !regex.test(input),
                    isNaN(parseFloat(input)),
                ];

                tests.some(test => {
                    if (test) {
                        this.setValidatorResult(property, 'float');
                    }
                });
            },

            inList: (needle, args) => {
                let [haystack] = args;
                let hasValue = false;
                const input = this.getValue(needle);

                if (input != null && haystack != null) {
                    hasValue = haystack.split(';').map(item => item.trim().toLowerCase()).includes(input.trim().toLowerCase());
                }

                if (!hasValue) {
                    this.setValidatorResult(needle, 'inList');
                }
            },

            notInList: (needle, args) => {
                let [haystack] = args;
                let hasValue = false;
                const input = this.getValue(needle);

                if (input != null && haystack != null) {
                    hasValue = haystack.split(';').map(item => item.trim().toLowerCase()).includes(input.trim().toLowerCase());
                }

                if (hasValue) {
                    this.setValidatorResult(needle, 'notInList');
                }
            },

            minNumeric: (property, args) => {
                let [val] = args;
                const regex = /^-?\d+(?:[.,]\d*?)?$/;
                const input = this.getValue(property);

                let tests = [
                    input == null,
                    Array.isArray(input),
                    !regex.test(input),
                    !regex.test(val),
                    isNaN(parseFloat(input)),
                    isNaN(parseFloat(val)),
                    !isFinite(input),
                    parseFloat(val) > parseFloat(input)
                ];

                tests.some(test => {
                    if (test) {
                        this.setValidatorResult(property, 'minNumeric');
                    }
                });
            },

            maxNumeric: (property, args) => {
                let [val] = args;
                const regex = /^-?\d+(?:[.,]\d*?)?$/;
                const input = this.getValue(property);

                let tests = [
                    input == null,
                    Array.isArray(input),
                    !regex.test(input),
                    !regex.test(val),
                    isNaN(parseFloat(input)),
                    isNaN(parseFloat(val)),
                    !isFinite(input),
                    parseFloat(input) > parseFloat(val),
                ];

                tests.some(test => {
                    if (test) {
                        this.setValidatorResult(property, 'maxNumeric');
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

                if (regex.test(this.getValue(property)) === false) {
                    this.setValidatorResult(property, 'date');
                }
            },

            starts: (property, args) => {
                let [needle, val] = args;
                const input = this.getValue(property);

                if (typeof val === "string") {
                    val = parseInt(val, 10);
                } else if (val == null) {
                    val = 0;
                }

                let tests = [
                    input == null,
                    Array.isArray(input),
                    isNaN(parseInt(val, 10)),
                    typeof input === "string" && !input.startsWith(needle, val)
                ];

                tests.some(test => {
                    if (test) {
                        this.setValidatorResult(property, 'starts');
                    }
                });
            },

            phone: property => {
                // '1234567890'
                // 1234567890
                // '(078)789-8908'
                // '123-345-3456'
                const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

                if (regex.test(this.getValue(property)) === false) {
                    this.setValidatorResult(property, 'phone');
                }
            },

            regex: (property, args) => {
                let [regex] = args;
                let regExp = new RegExp(regex);
                const input = this.getValue(property);

                let tests = [
                    input === '',
                    input == null,
                    Array.isArray(input),
                    regExp.test(input) === false
                ];

                tests.some(test => {
                    if (test) {
                        this.setValidatorResult(property, 'regex');
                    }
                });
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
                this.parse(this.filtersMap, config.filters);
            }

            if (config.hasOwnProperty('validators')) {
                this.parse(this.validatorsMap, config.validators);
            }

            return this.result;
        }
    }

    /**
     *
     * @param setResult
     * @param map
     * @param items
     */
    parse(setResult, map, items = []) {

        items.forEach(item => {
            for (let [property, rules] of Object.entries(item)) {
                console.log(`[parse] property: ${property} rules: ${rules}`);

                if (typeof rules === 'string') {
                    rules.split('|')
                        .filter(segment => segment !== '') // remove any rules that came across as empty
                        .forEach(segment => {
                            let [rule, ...args] = segment.split(',').map(segment => segment.trim());
                            console.log(`[parse] property: ${property} rule: ${rule}`);
                            const result = map[rule](this.getValue(property), args);
                            const test = {
                                property: property,
                                result: result,
                                rule: rule,
                            };

                            console.log(`[parse] test:`);
                            console.log(test);
                            setResult(test);
                        });
                }
            }
        });
    }

    validate(object = {}, validators = []) {
        if (Object.prototype.toString.call(object) === '[object Object]' && Array.isArray(validators)) {
            this.setup(object);
            const result = this.parse(this.validatorsMap, validators);
            if (result.result) {
                this.setValidatorResult(result.property, result.rule);
            }
        }
        return this.result.validators;
    }

    filter(object = {}, filters = []) {
        if (Object.prototype.toString.call(object) === '[object Object]' && Array.isArray(filters)) {
            this.setup(object);
            this.parse(this.setFilterResult, this.filtersMap, filters);
            // console.log(`[filter] result`);
            // console.log(result);
            // this.setFilterResult(result.property, result.result);
        }
        return this.result.filters;
    }

    addFilter(name, filter = {}) {
        if (Object.prototype.toString.call(filter) === '[object Object]' ) {
            this.filtersMap[name] = filter;
        }
    }

}

module.exports = FilterValidate;
