/**
 * Write something meaningful here later
 * @param object {object} stuff
 * @param validators {array <object>} stuff
 * @param filters {array <object>} stuff
 * @returns {object}
 */
exports.filterValidate = function(object, validators, filters ) {
    let result  = {
        validators: {
            failed: {}
        }
    };

    let initProperty = (property) => {
        if (!result.validators.failed.hasOwnProperty(property)) {
            result.validators.failed[property] = [];
        }
    };

    let validatorsMap = {
        required: property => {
            if (!object.hasOwnProperty(property) || ['', null, undefined].includes(object[property])) {
                initProperty(property);
                result.validators.failed[property].push('required');
            }
        },

        validEmail: property => {
            const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            const regExp = new RegExp(regex);

            if (regExp.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('validEmail');
            }
        },

        maxLen: (property, len) => {
            if (object[property].length > len) {
                initProperty(property);
                result.validators.failed[property].push('maxLen');
            }
        },

        minLen: (property, len) => {
            if (object[property].length < len) {
                initProperty(property);
                result.validators.failed[property].push('minLen');
            }
        },

        exactLen: (property, len) => {
            if (object[property].length !== len) {
                initProperty(property);
                result.validators.failed[property].push('exactLen');
            }
        },

        alpha: property => {
            const regex = /^[a-zA-Z]*$/;
            const regExp = new RegExp(regex);

            if (regExp.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('alpha');
            }
        },

        alphaNumeric: property => {
            const regex = /^[a-zA-Z0-9]*$/;
            const regExp = new RegExp(regex);

            if (regExp.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('alphaNumeric');
            }
        },

        alphaDash: property => {
            const regex = /^[a-zA-Z0-9-_]*$/;
            const regExp = new RegExp(regex);

            if (regExp.test(object[property]) === false) {
                initProperty(property);
                result.validators.failed[property].push('alphaDash');
            }
        },

        alphaSpace: property => {
            const regex = /^[a-zA-Z0-9\s]*$/;
            const regExp = new RegExp(regex);

            if (regExp.test(object[property]) === false) {
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

    };

    validators.forEach(validator => {
        for (let [property, rules] of Object.entries(validator)) {
            // console.log(`${property}: ${rules}`);

            rules.split('|').forEach(segment => {
                let [rule, len] = segment.split(',').map(segment => segment.trim());

                if (typeof len === 'string') {
                    len = parseInt(len, 10);
                }

                validatorsMap[rule](property, len);
            });
        }

    });

    return result;
};
