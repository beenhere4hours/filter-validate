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

    let validatorsMap = {
        required: property => {
            if (!object.hasOwnProperty(property)) {
                if (!result.validators.failed.hasOwnProperty(property)) {
                    result.validators.failed[property] = [];
                }

                result.validators.failed[property].push('required');
            }
        }
    };

    for (let [property, rules] of Object.entries(validators)) {
        console.log(`${property}: ${rules}`);

        rules.split('|').forEach(rule => {
            validatorsMap[rule](property);
        });
    }

    return result;
};
