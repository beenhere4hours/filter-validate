/**
 * Write something meaningful here later
 * @param object {object} stuff
 * @param validators {array <object>} stuff
 * @param filters {array <object>} stuff
 * @returns {object}
 */
exports.filterValidate = function(object, validators, filters ) {
    let validators = {
        required: (property) => object.hasOwnProperty(property)
    };


    // return keys.split('.').reduce( ( obj, key ) => ( obj || { } )[ key ], object ) !== undefined;
};
