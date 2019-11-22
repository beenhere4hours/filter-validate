const should = require('chai').should();
const filterValidate = require("../index").filterValidate;

describe('check validators', function () {

    describe('required', function () {
        it('should check a property exists', function () {
            const object = {
                test: 'Calvin'
            };

            const validatorRules = [
                {
                    test: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check a property exists and fails for empty string', function () {
            const object = {
                test: ''
            };

            const validatorRules = [
                {
                    test: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check a property exists and fails for null value', function () {
            const object = {
                test: null
            };

            const validatorRules = [
                {
                    test: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check a property exists and fails for undefined value', function () {
            const object = {
                test: undefined
            };

            const validatorRules = [
                {
                    test: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check a property fails for not existing ', function () {
            const object = {};

            const validatorRules = [
                {
                    test: 'required'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

    });

    describe('validEmail', function () {
        it('should check the email is valid', function () {
            const object = {
                test: 'test@gmail.com'
            };

            const validatorRules = [
                {
                    test: 'validEmail'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the email is invalid', function () {
            const object = {
                test: 'testgmail.com'
            };

            const validatorRules = [
                {
                    test: 'validEmail'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('maxLen', function () {
        it('should check the string does not exceed max length', function () {
            const object = {
                test: '12345'
            };

            const validatorRules = [
                {
                    test: 'maxLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string exceeds the given max length', function () {
            const object = {
                test: '1234567890'
            };

            const validatorRules = [
                {
                    test: 'maxLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('minLen', function () {
        it('should check the string is not shorter than the minimum length', function () {
            const object = {
                test: '1234567890'
            };

            const validatorRules = [
                {
                    test: 'minLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string is shorter than the minimum length', function () {
            const object = {
                test: '12345'
            };

            const validatorRules = [
                {
                    test: 'minLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('exactLen', function () {
        it('should check the string length is the given length', function () {
            const object = {
                test: '1234567890'
            };

            const validatorRules = [
                {
                    test: 'exactLen,10'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string length does not match the given length', function () {
            const object = {
                test: '12345'
            };

            const validatorRules = [
                {
                    test: 'exactLen,7'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('alpha', function () {
        it('should check the string contains only a-z, A-Z', function () {
            const object = {
                test: 'abcABC'
            };

            const validatorRules = [
                {
                    test: 'alpha'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string contains characters not in a-z, A-Z', function () {
            const object = {
                test: '12345'
            };

            const validatorRules = [
                {
                    test: 'alpha'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('alphaNumeric', function () {
        it('should check the string contains only a-z, A-Z, 0-9', function () {
            const object = {
                test: 'abcABC123'
            };

            const validatorRules = [
                {
                    test: 'alphaNumeric'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string contains characters not in a-z, A-Z, 0-9', function () {
            const object = {
                test: '@#$%^&'
            };

            const validatorRules = [
                {
                    test: 'alphaNumeric'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('alphaDash', function () {
        it('should check the string contains only a-z, A-Z, 0-9, underscore, and dash', function () {
            const object = {
                test: 'abcABC123-_'
            };

            const validatorRules = [
                {
                    test: 'alphaDash'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string contains characters not in a-z, A-Z, 0-9, underscore, and dash', function () {
            const object = {
                test: '@#$%^&'
            };

            const validatorRules = [
                {
                    test: 'alphaDash'
                }
            ];

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });
});
