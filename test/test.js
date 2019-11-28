const should = require('chai').should();
const filterValidate = require("../index").filterValidate;

describe('check validators', function () {

    describe('required', function () {

        const validatorRules = [
            {
                test: 'required'
            }
        ];

        it('should check the test property exists', function () {
            const object = {
                test: 'Calvin'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check a property exists and is NOT an empty string ""', function () {
            const object = {
                test: ''
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check a property exists and NOT a null value', function () {
            const object = {
                test: null
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check a property exists and NOT an undefined value', function () {
            const object = {
                test: undefined
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check the property test does NOT exist', function () {
            const object = {};

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

    });

    describe('validEmail', function () {

        const validatorRules = [
            {
                test: 'validEmail'
            }
        ];

        it('should check "test@gmail.com" is valid', function () {
            const object = {
                test: 'test@gmail.com'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check "testgmail.com" is NOT valid', function () {
            const object = {
                test: 'testgmail.com'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('maxLen', function () {
        const validatorRules = [
            {
                test: 'maxLen,7'
            }
        ];

        it('should check the string does not exceed max length', function () {
            const object = {
                test: '12345'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string exceeds the given max length', function () {
            const object = {
                test: '1234567890'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('minLen', function () {

        const validatorRules = [
            {
                test: 'minLen,7'
            }
        ];

        it('should check the string is not shorter than the minimum length', function () {
            const object = {
                test: '1234567890'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string is shorter than the minimum length', function () {
            const object = {
                test: '12345'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('exactLen', function () {

        const validatorRules = [
            {
                test: 'exactLen,10'
            }
        ];

        it('should check the string length is the given length', function () {
            const object = {
                test: '1234567890'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string length does not match the given length', function () {
            const object = {
                test: '12345'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('alpha', function () {

        const validatorRules = [
            {
                test: 'alpha'
            }
        ];

        it('should check "abcABC" contains only a-z, A-Z', function () {
            const object = {
                test: 'abcABC'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check "12345" is NOT in a-z, A-Z', function () {
            const object = {
                test: '12345'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('alphaNumeric', function () {

        const validatorRules = [
            {
                test: 'alphaNumeric'
            }
        ];

        it('should check "abcABC123" contains characters in the range of a-z, A-Z, 0-9', function () {
            const object = {
                test: 'abcABC123'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check "@#$%^&" contains characters NOT in the range of a-z, A-Z, 0-9', function () {
            const object = {
                test: '@#$%^&'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('alphaDash', function () {

        const validatorRules = [
            {
                test: 'alphaDash'
            }
        ];

        it('should check the string contains only a-z, A-Z, 0-9, underscore, and dash', function () {
            const object = {
                test: 'abcABC123-_'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string contains characters not in a-z, A-Z, 0-9, underscore, and dash', function () {
            const object = {
                test: '@#$%^&'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('alphaSpace', function () {

        const validatorRules = [
            {
                test: 'alphaSpace'
            }
        ];

        it('should check the string contains only a-z, A-Z, 0-9, \s', function () {
            const object = {
                test: 'abc ABC 123 '
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check the string contains characters not in a-z, A-Z, 0-9, \s', function () {
            const object = {
                test: '@#$%^&'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('numeric', function () {

        const validatorRules = [
            {
                test: 'numeric'
            }
        ];

        it('should check "42" is numeric', function () {
            const object = {
                test: '42'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check 0x539 is numeric', function () {
            const object = {
                test: 0x539
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check 0o2471 is numeric', function () {
            const object = {
                test: 0o2471
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check 0b10100111001 is numeric', function () {
            const object = {
                test: 0b10100111001
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check 9.1 is numeric', function () {
            const object = {
                test: 9.1
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check "not numeric" is NOT numeric', function () {
            const object = {
                test: 'not numeric'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check array() is NOT numeric', function () {
            const object = {
                test: []
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check null is NOT numeric', function () {
            const object = {
                test: null
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

    });

    describe('integer', function () {

        const validatorRules = [
            {
                test: 'integer'
            }
        ];

        it('should check 42 is integer', function () {
            const object = {
                test: 42
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check -42 is integer', function () {
            const object = {
                test: -42
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check 42.2 is NOT an integer', function () {
            const object = {
                test: 42.2
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check "42" is NOT an integer', function () {
            const object = {
                test: "42"
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check array() is NOT an integer', function () {
            const object = {
                test: []
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check null is NOT an integer', function () {
            const object = {
                test: null
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('float', function () {

        const validatorRules = [
            {
                test: 'float'
            }
        ];

        it('should check 42.2 is float', function () {
            const object = {
                test: 42.2
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check -42.2 is float', function () {
            const object = {
                test: -42.2
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check 42 is a float', function () {
            const object = {
                test: 42
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check "42.2" is a float', function () {
            const object = {
                test: "42.2"
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check array() is NOT a float', function () {
            const object = {
                test: []
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check null is NOT a float', function () {
            const object = {
                test: null
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });
    });

    describe('containedInList', function () {

        const validatorRules = [
            {
                test: 'containedInList, one; two; three; four; tell me more;'
            }
        ];

        it('should check "four" is in the list', function () {
            const object = {
                test: 'four'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check "five" is NOT in the list', function () {
            const object = {
                test: 'five'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

    });

    describe('notContainedInList', function () {

        const validatorRules = [
            {
                test: 'notContainedInList, one; two; three; four; tell me more;'
            }
        ];

        it('should check "five" is not in the list', function () {
            const object = {
                test: 'five'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check "four" is IN the list', function () {
            const object = {
                test: 'four'
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

    });

    describe('minNumeric', function () {

        const validatorRules = [
            {
                test: 'minNumeric,7'
            }
        ];

        it('should check 10 is higher or equal to 7', function () {
            const object = {
                test: 10
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(0);
        });

        it('should check 5 is NOT higher or equal to 7', function () {
            const object = {
                test: 5
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

        it('should check null is NOT a valid value to get min from', function () {
            const object = {
                test: null
            };

            let result = filterValidate(object, validatorRules, null);
            Object.keys(result.validators.failed).length.should.equal(1);
        });

    });
});