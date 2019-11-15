const should = require('chai').should();
const filterValidate = require("../index").filterValidate;

describe('check validators', function () {

    describe('required', function () {
        it('should check a property exists', function () {
            const object = {
                name: 'Calvin'
            };

            const validatorRules = [
                {
                    name: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check a property exists and fails for empty string', function () {
            const object = {
                name: ''
            };

            const validatorRules = [
                {
                    name: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check a property exists and fails for null value', function () {
            const object = {
                name: null
            };

            const validatorRules = [
                {
                    name: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check a property exists and fails for undefined value', function () {
            const object = {
                name: undefined
            };

            const validatorRules = [
                {
                    name: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check a property fails for not existing ', function () {
            const object = {};

            const validatorRules = [
                {
                    name: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

    });
});
