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

    describe('validEmail', function () {
        it('should check the email is valid', function () {
            const object = {
                email: 'test@gmail.com'
            };

            const validatorRules = [
                {
                    email: 'validEmail'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the email is invalid', function () {
            const object = {
                email: 'testgmail.com'
            };

            const validatorRules = [
                {
                    email: 'validEmail'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('maxLen', function () {
        it('should check the string does not exceed max length', function () {
            const object = {
                theMax: '12345'
            };

            const validatorRules = [
                {
                    theMax: 'maxLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string exceeds the given max length', function () {
            const object = {
                theMax: '1234567890'
            };

            const validatorRules = [
                {
                    theMax: 'maxLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('minLen', function () {
        it('should check the string is not shorter than the minimum length', function () {
            const object = {
                theMin: '1234567890'
            };

            const validatorRules = [
                {
                    theMin: 'minLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string is shorter than the minimum length', function () {
            const object = {
                theMin: '12345'
            };

            const validatorRules = [
                {
                    theMin: 'minLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('exactLen', function () {
        it('should check the string length is the given length', function () {
            const object = {
                theExactLen: '1234567890'
            };

            const validatorRules = [
                {
                    theExactLen: 'exactLen,10'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string length does not match the given length', function () {
            const object = {
                theExactLen: '12345'
            };

            const validatorRules = [
                {
                    theExactLen: 'exactLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });
});
