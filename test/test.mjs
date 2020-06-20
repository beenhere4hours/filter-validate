// https://www.npmjs.com/package/chai#native-modules-usage--registers-the-chai-testing-style-globally-
import 'chai/register-assert.js';  // Using Assert style
import 'chai/register-expect.js';  // Using Expect style
import 'chai/register-should.js';  // Using Should style
import { FilterValidate } from '../src/filter-validate.mjs';


describe('filter validate', function () {

    describe('check each validator', function () {
        const filterValidate = new FilterValidate();

        describe('required', function () {

            const validatorRules = [{test: 'required'}];

            it('should check the test property exists', function () {
                Object.keys(filterValidate.validate({ test: 'Calvin' }, validatorRules)).length.should.equal(0);
            });

            it('should check a property exists and is NOT an empty string ""', function () {
                Object.keys(filterValidate.validate({ test: '' }, validatorRules)).length.should.equal(1);
            });

            it('should check a property exists and NOT a null value', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });

            it('should check a property exists and NOT an undefined value', function () {
                Object.keys(filterValidate.validate({ test: undefined }, validatorRules)).length.should.equal(1);
            });

            it('should check the property test does NOT exist', function () {
                Object.keys(filterValidate.validate({}, validatorRules)).length.should.equal(1);
            });

        });

        describe('validEmail', function () {

            describe('valid', function () {
                const validatorRules = [{test: 'validEmail'}];

                it('should check "test@gmail.com"', function () {
                    Object.keys(filterValidate.validate({test: 'test@gmail.com'}, validatorRules)).length.should.equal(0);
                });

                it('should check "test.test@gmail.com"', function () {
                    Object.keys(filterValidate.validate({test: 'test.test@gmail.com'}, validatorRules)).length.should.equal(0);
                });

                it('should check "test.with+symbol@gmail.com"', function () {
                    Object.keys(filterValidate.validate({test: 'test.with+symbol@gmail.com'}, validatorRules)).length.should.equal(0);
                });

                it('should check "test.with-symbol@gmail.com"', function () {
                    Object.keys(filterValidate.validate({test: 'test.with-symbol@gmail.com'}, validatorRules)).length.should.equal(0);
                });

                it('should check "x@gmail.com" one character local', function () {
                    Object.keys(filterValidate.validate({test: 'x@gmail.com'}, validatorRules)).length.should.equal(0);
                });

                it('should check \'"this.is.awkward@awkward.com"@gmail.com\'', function () {
                    Object.keys(filterValidate.validate({test: '"this.is.awkward@awkward.com"@gmail.com'}, validatorRules)).length.should.equal(0);
                });

                it('should check \'"very.(),:;<>[]\\".VERY.\\"very@\\ \\"very\\".unusual@gmail.com\'', function () {
                    Object.keys(filterValidate.validate({test: '"very.(),:;<>[]\\".VERY.\\"very@\\ \\"very\\".unusual@gmail.com'}, validatorRules)).length.should.equal(0);
                });

                it('should check "/#!$%&\'*+-/=?^_`{}|~@gmail.com"', function () {
                    Object.keys(filterValidate.validate({ test: '/#!$%&\'*+-/=?^_`{}|~@gmail.com' }, validatorRules)).length.should.equal(0);
                });

                it(`should check "()<>[]:,;@\\\\"!#$%&'-/=?^_\`{}|~.a"@example.org`, function () {
                    Object.keys(filterValidate.validate({ test: `"()<>[]:,;@\\\\"!#$%&'-/=?^_\`{}|~.a"@example.org` }, validatorRules)).length.should.equal(0);
                });

            });

            describe('NOT valid', function () {
                const validatorRules = [{ test: 'validEmail' }];

                it('should check "testgmail.com"', function () {
                    Object.keys(filterValidate.validate({ test: 'testgmail.com' }, validatorRules)).length.should.equal(1);
                });

                it('should check "admin@webserver1" local domain without top level domain', function () {
                    Object.keys(filterValidate.validate({ test: 'admin@webserver1' }, validatorRules)).length.should.equal(1);
                });

                it('should check \'" "@gmail.com\'', function () {
                    Object.keys(filterValidate.validate({ test: `" "@gmail.com` }, validatorRules)).length.should.equal(1);
                });

                it('should check "user@[IPv6:2001:DB8::1]"', function () {
                    Object.keys(filterValidate.validate({ test: 'user@[IPv6:2001:DB8::1]' }, validatorRules)).length.should.equal(1);
                });

            });

        });

        describe('maxLen', function () {
            const validatorRules = [ { test: 'maxLen,7' } ];

            it('should check the string does not exceed max length', function () {
                Object.keys(filterValidate.validate({ test: '12345' }, validatorRules)).length.should.equal(0);
            });

            it('should check the string exceeds the given max length', function () {
                Object.keys(filterValidate.validate({ test: '1234567890' }, validatorRules)).length.should.equal(1);
            });
        });

        describe('minLen', function () {

            const validatorRules = [ { test: 'minLen,7' } ];

            it('should check the string is not shorter than the minimum length', function () {
                Object.keys(filterValidate.validate({ test: '1234567890' }, validatorRules)).length.should.equal(0);
            });

            it('should check the string is shorter than the minimum length', function () {
                Object.keys(filterValidate.validate({ test: '12345' }, validatorRules)).length.should.equal(1);
            });
        });

        describe('exactLen', function () {

            const validatorRules = [ { test: 'exactLen,10' } ];

            it('should check the string length is the given length', function () {
                Object.keys(filterValidate.validate({ test: '1234567890' }, validatorRules)).length.should.equal(0);
            });

            it('should check the string length does not match the given length', function () {
                Object.keys(filterValidate.validate({ test: '12345' }, validatorRules)).length.should.equal(1);
            });
        });

        describe('alpha', function () {

            const validatorRules = [ { test: 'alpha' } ];

            it('should check "abcABC" contains only a-z, A-Z', function () {
                Object.keys(filterValidate.validate({ test: 'abcABC' }, validatorRules)).length.should.equal(0);
            });

            it('should check "12345" is NOT in a-z, A-Z', function () {
                Object.keys(filterValidate.validate({ test: '12345' }, validatorRules)).length.should.equal(1);
            });
        });

        describe('alphaNumeric', function () {

            const validatorRules = [ { test: 'alphaNumeric' } ];

            it('should check "abcABC123" contains characters in the range of a-z, A-Z, 0-9', function () {
                Object.keys(filterValidate.validate({ test: 'abcABC123' }, validatorRules)).length.should.equal(0);
            });

            it('should check "@#$%^&" contains characters NOT in the range of a-z, A-Z, 0-9', function () {
                Object.keys(filterValidate.validate({ test: '@#$%^&' }, validatorRules)).length.should.equal(1);
            });
        });

        describe('alphaDash', function () {

            const validatorRules = [ { test: 'alphaDash' } ];

            it('should check the string contains only a-z, A-Z, 0-9, underscore, and dash', function () {
                Object.keys(filterValidate.validate({ test: 'abcABC123-_' }, validatorRules)).length.should.equal(0);
            });

            it('should check the string contains characters not in a-z, A-Z, 0-9, underscore, and dash', function () {
                Object.keys(filterValidate.validate({ test: '@#$%^&' }, validatorRules)).length.should.equal(1);
            });
        });

        describe('alphaSpace', function () {

            const validatorRules = [ { test: 'alphaSpace' } ];

            it('should check the string contains only a-z, A-Z, 0-9, \s', function () {
                Object.keys(filterValidate.validate({ test: 'abc ABC 123 ' }, validatorRules)).length.should.equal(0);
            });

            it('should check the string contains characters not in a-z, A-Z, 0-9, \s', function () {
                Object.keys(filterValidate.validate({ test: '@#$%^&' }, validatorRules)).length.should.equal(1);
            });
        });

        describe('numeric', function () {

            const validatorRules = [ { test: 'numeric' } ];
            it('should check string "42" is numeric', function () {
                Object.keys(filterValidate.validate({ test: '42' }, validatorRules)).length.should.equal(0);
            });

            it('should check integer 42 is numeric', function () {
                Object.keys(filterValidate.validate({ test: 42 }, validatorRules)).length.should.equal(0);
            });

            it('should check float 42.0 is numeric', function () {
                Object.keys(filterValidate.validate({ test: 42.0 }, validatorRules)).length.should.equal(0);
            });

            it('should check hex/base 16 0x2A is numeric', function () {
                Object.keys(filterValidate.validate({ test: 0x2A }, validatorRules)).length.should.equal(0);
            });

            it('should check octal 0o2471 is numeric', function () {
                Object.keys(filterValidate.validate({ test: 0o2471 }, validatorRules)).length.should.equal(0);
            });

            it('should check binary 0b101010 is numeric', function () {
                Object.keys(filterValidate.validate({ test: 0b101010 }, validatorRules)).length.should.equal(0);
            });

            it('should check "not numeric" is NOT numeric', function () {
                Object.keys(filterValidate.validate({ test: 'not numeric' }, validatorRules)).length.should.equal(1);
            });

            it('should check array() is NOT numeric', function () {
                Object.keys(filterValidate.validate({ test: [] }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT numeric', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });

        });

        describe('integer', function () {

            const validatorRules = [ { test: 'integer' } ];

            it('should check 42 is integer', function () {
                Object.keys(filterValidate.validate({ test: 42 }, validatorRules)).length.should.equal(0);
            });

            it('should check -42 is integer', function () {
                Object.keys(filterValidate.validate({ test: -42 }, validatorRules)).length.should.equal(0);
            });

            it('should check 42.2 is NOT an integer', function () {
                Object.keys(filterValidate.validate({ test: 42.2 }, validatorRules)).length.should.equal(1);
            });

            it('should check "42" is NOT an integer', function () {
                Object.keys(filterValidate.validate({ test: "42" }, validatorRules)).length.should.equal(1);
            });

            it('should check array() is NOT an integer', function () {
                Object.keys(filterValidate.validate({ test: [] }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT an integer', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });
        });

        describe('float', function () {

            const validatorRules = [ { test: 'float' } ];

            it('should check 42.2 is float', function () {
                Object.keys(filterValidate.validate({ test: 42.2 }, validatorRules)).length.should.equal(0);
            });

            it('should check -42.2 is float', function () {
                Object.keys(filterValidate.validate({ test: -42.2 }, validatorRules)).length.should.equal(0);
            });

            it('should check 42 is a float', function () {
                Object.keys(filterValidate.validate({ test: 42 }, validatorRules)).length.should.equal(0);
            });

            it('should check "42.2" is a float', function () {
                Object.keys(filterValidate.validate({ test: "42.2" }, validatorRules)).length.should.equal(0);
            });

            it('should check array() is NOT a float', function () {
                Object.keys(filterValidate.validate({ test: [] }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT a float', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });
        });

        describe('inList', function () {

            const validatorRules = [ { test: 'inList, one; two; three; four; tell me more;' } ];

            it('should check "four" is in the list', function () {
                Object.keys(filterValidate.validate({ test: 'four' }, validatorRules)).length.should.equal(0);
            });

            it('should check "five" is NOT in the list', function () {
                Object.keys(filterValidate.validate({ test: 'five' }, validatorRules)).length.should.equal(1);
            });

        });

        describe('notInList', function () {

            const validatorRules = [ { test: 'notInList, one; two; three; four; tell me more;' } ];

            it('should check "five" is not in the list', function () {
                Object.keys(filterValidate.validate({ test: 'five' }, validatorRules)).length.should.equal(0);
            });

            it('should check "four" is IN the list', function () {
                Object.keys(filterValidate.validate({ test: 'four' }, validatorRules)).length.should.equal(1);
            });

        });

        describe('minNumeric', function () {

            const validatorRules = [ { test: 'minNumeric,7' } ];

            it('should check 10 is higher or equal to 7', function () {
                Object.keys(filterValidate.validate({ test: 10 }, validatorRules)).length.should.equal(0);
            });

            it('should check "10" is higher or equal to 7', function () {
                Object.keys(filterValidate.validate({ test: '10' }, validatorRules)).length.should.equal(0);
            });

            it('should check 0x539 is higher or equal to 7', function () {
                Object.keys(filterValidate.validate({ test: 0x539 }, validatorRules)).length.should.equal(0);
            });

            it('should check 0o2471 is higher or equal to 7', function () {
                Object.keys(filterValidate.validate({ test: 0o2471 }, validatorRules)).length.should.equal(0);
            });

            it('should check 0b10100111001 is higher or equal to 7', function () {
                Object.keys(filterValidate.validate({ test: 0b10100111001 }, validatorRules)).length.should.equal(0);
            });

            it('should check 5 is NOT higher or equal to 7', function () {
                Object.keys(filterValidate.validate({ test: 5 }, validatorRules)).length.should.equal(1);
            });

            it('should check "5" is NOT higher or equal to 7', function () {
                Object.keys(filterValidate.validate({ test: 5 }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT a valid value to get min from', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });

        });

        describe('maxNumeric', function () {

            const validatorRules = [ { test: 'maxNumeric,1500' } ];

            it('should check 1000 is lower or equal to 1500', function () {
                Object.keys(filterValidate.validate({ test: 1000 }, validatorRules)).length.should.equal(0);
            });

            it('should check "1000" is lower or equal to 1500', function () {
                Object.keys(filterValidate.validate({ test: '1000' }, validatorRules)).length.should.equal(0);
            });

            it('should check 0x539 is lower or equal to 1500', function () {
                Object.keys(filterValidate.validate({ test: 0x539 }, validatorRules)).length.should.equal(0);
            });

            it('should check 0o2471 is lower or equal to 1500', function () {
                Object.keys(filterValidate.validate({ test: 0o2471 }, validatorRules)).length.should.equal(0);
            });

            it('should check 0b10100111001 is lower or equal to 1500', function () {
                Object.keys(filterValidate.validate({ test: 0b10100111001 }, validatorRules)).length.should.equal(0);
            });

            it('should check 2000 is higher and NOT equal to 1500', function () {
                Object.keys(filterValidate.validate({ test: 2000 }, validatorRules)).length.should.equal(1);
            });

            it('should check "2000" is higher and NOT equal to 1500', function () {
                Object.keys(filterValidate.validate({ test: 2000 }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT a valid value to get max from', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });

        });

        describe('date', function () {

            const validatorRules = [ { test: 'date' } ];

            it('should check "1997" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20+01:00" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20+01:00' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20+01:00Z" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20+01:00Z' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20-01:00" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20-01:00' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20-01:00Z" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20-01:00Z' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20:30+01:00" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20:30+01:00' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20:30+01:00Z" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20:30+01:00Z' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20:30.45+01:00" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20:30.45+01:00' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20:30.45+01:00Z" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20:30.45+01:00Z' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20:30.45-01:00" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20:30.45-01:00' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-07-16T19:20:30.45-01:00Z" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-07-16T19:20:30.45-01:00Z' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1997-13-39T19:58:30.45-01:00Z" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1997-13-39T19:58:30.45-01:00Z' }, validatorRules)).length.should.equal(0);
            });

            it('should check "-1997-13-39T19:58:30.45-01:00Z" is valid', function () {
                Object.keys(filterValidate.validate({ test: '-1997-13-39T19:58:30.45-01:00Z' }, validatorRules)).length.should.equal(0);
            });

            it('should check "" is NOT a valid date string', function () {
                Object.keys(filterValidate.validate({ test: "" }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT a valid date string', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });

            it('should check array() is NOT a valid date string', function () {
                Object.keys(filterValidate.validate({ test: [] }, validatorRules)).length.should.equal(1);
            });

        });

        describe('starts', function () {

            // test: 'supercalifragilisticexpialidocious'
            it('should check "supercalifragilisticexpialidocious" starts with "super" while defaulting to 0 starting position', function () {
                const validatorRules = [ { test: 'starts, super' } ];
                Object.keys(filterValidate.validate({ test: 'supercalifragilisticexpialidocious' }, validatorRules)).length.should.equal(0);
            });

            it('should check "supercalifragilisticexpialidocious" starts with "fragilistic" when specifying starting position of 9', function () {
                const validatorRules = [ { test: 'starts, fragilistic, 9' } ];
                Object.keys(filterValidate.validate({ test: 'supercalifragilisticexpialidocious' }, validatorRules)).length.should.equal(0);
            });

            it('should check "" is NOT a valid search string', function () {
                const validatorRules = [ { test: 'starts, super' } ];
                Object.keys(filterValidate.validate({ test: "" }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT a valid search string', function () {
                const validatorRules = [ { test: 'starts, super' } ];
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });

            it('should check array() is NOT a valid search string', function () {
                const validatorRules = [ { test: 'starts, super' } ];
                Object.keys(filterValidate.validate({ test: [] }, validatorRules)).length.should.equal(1);
            });

        });

        describe('phone', function () {

            const validatorRules = [ { test: 'phone' } ];

            it('should check "1234567890" is valid', function () {
                Object.keys(filterValidate.validate({ test: '1234567890' }, validatorRules)).length.should.equal(0);
            });

            it('should check 1234567890 is valid', function () {
                Object.keys(filterValidate.validate({ test: 1234567890 }, validatorRules)).length.should.equal(0);
            });

            it('should check "(078)789-8908" is valid', function () {
                Object.keys(filterValidate.validate({ test: '(078)789-8908' }, validatorRules)).length.should.equal(0);
            });

            it('should check "123-345-3456" is valid', function () {
                Object.keys(filterValidate.validate({ test: '123-345-3456' }, validatorRules)).length.should.equal(0);
            });

            it('should check "" is NOT valid', function () {
                Object.keys(filterValidate.validate({ test: "" }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT valid', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });

            it('should check array() is NOT valid', function () {
                Object.keys(filterValidate.validate({ test: [] }, validatorRules)).length.should.equal(1);
            });

        });

        describe('regex', function () {

            const validatorRules = [ { test: 'regex, ^[a-zA-Z]*$' } ];

            it('should check "abcdefgh" is valid with string regex pattern of "^[a-zA-Z]*$"', function () {
                Object.keys(filterValidate.validate({ test: 'abcdefgh' }, validatorRules)).length.should.equal(0);
            });

            it('should check "1234567890" is NOT valid with string regex pattern of "^[a-zA-Z]*$"', function () {
                Object.keys(filterValidate.validate({ test: '1234567890' }, validatorRules)).length.should.equal(1);
            });

            it('should check "" is NOT valid with string regex pattern of "^[a-zA-Z]*$"', function () {
                Object.keys(filterValidate.validate({ test: "" }, validatorRules)).length.should.equal(1);
            });

            it('should check null is NOT valid with string regex pattern of "^[a-zA-Z]*$"', function () {
                Object.keys(filterValidate.validate({ test: null }, validatorRules)).length.should.equal(1);
            });

            it('should check array() is NOT valid with string regex pattern of "^[a-zA-Z]*$"', function () {
                Object.keys(filterValidate.validate({ test: [] }, validatorRules)).length.should.equal(1);
            });

        });

    });


    describe('check each filter', function () {
        const filterValidate = new FilterValidate();

        describe('sanitizeNumbers', function () {

            it('should check the string "abc123" only contains numbers as result', function () {
                filterValidate.filter({ test: 'abc123' }, [ { test: 'sanitizeNumbers'} ]).test.should.equal('123');
            });

        });

        describe('sanitizeEmail', function () {

            const filterToTest = 'sanitizeEmail';
            const filters = [ { test: filterToTest } ];

            it('should check the leading space is removed from " valid.email.address@gmail.com"', function () {
                filterValidate.filter({ test: ' valid.email.address@gmail.com' }, filters).test
                    .should.equal('valid.email.address@gmail.com');
            });

            it('should check the trailing space is removed from "valid.email.address@gmail.com "', function () {
                filterValidate.filter({ test: 'valid.email.address@gmail.com ' }, filters).test
                    .should.equal('valid.email.address@gmail.com');
            });

            it('should check the space is removed from "valid.email .address@gmail.com "', function () {
                filterValidate.filter({ test: 'valid.email .address@gmail.com ' }, filters).test
                    .should.equal('valid.email.address@gmail.com');
            });

            it('should check the special characters are removed from "a"b(c)d,e:f;gi[j\\k]l@gmail.com" leaving "abcdefgi[jk]l@gmail.com" as a result', function () {
                filterValidate.filter({ test: 'a"b(c)d,e:f;gi[j\\k]l@gmail.com' }, filters).test
                    .should.equal('abcdefgi[jk]l@gmail.com');
            });

        });

        describe('trim', function () {

            const filterToTest = 'trim';
            const filters = [ { test: filterToTest } ];

            it('should check the string "   abc   " only contains "abc" as result', function () {
                filterValidate.filter({ test: '   abc   ' }, filters).test.should.equal('abc');
            });

        });

        describe('ltrim', function () {

            const filterToTest = 'ltrim';
            const filters = [ { test: filterToTest } ];

            it('should check the string "   abc   " only contains "abc   " as result', function () {
                filterValidate.filter({ test: '   abc   ' }, filters).test.should.equal('abc   ');
            });

        });

        describe('rtrim', function () {

            const filterToTest = 'rtrim';
            const filters = [ { test: filterToTest } ];

            it('should check the string "   abc   " only contains "   abc" as result', function () {
                filterValidate.filter({ test: '   abc   ' }, filters).test.should.equal('   abc');
            });

        });

    });

    describe('check multiple validators', function () {
        const filterValidate = new FilterValidate();

        describe('alpha minLen maxLen', function () {

            const validatorRules = [ { test: 'alpha|minLen, 3|maxLen, 6' } ];

            it('should check "abcABC" contains only a-z, A-Z, is at least 3 characters in length and no more than 6 characters in length', function () {
                Object.keys(filterValidate.validate({ test: 'abcABC' }, validatorRules)).length.should.equal(0);
            });

            it('should check "abcABC" contains only a-z, A-Z, is at least 3 characters in length and no more than 6 characters in length and ends with an empty rule', function () {
                Object.keys(filterValidate.validate({ test: 'abcABC' }, validatorRules)).length.should.equal(0);
            });

            it('should check "123abcABC" is NOT valid as it exceeds the max length of 6 and contains characters not within A-Z or a-z', function () {
                let result = filterValidate.validate({ test: '123abcABC' }, validatorRules);
                result.hasOwnProperty('test').should.be.true;
                result.test.includes('alpha').should.be.true;
                result.test.includes('maxLen').should.be.true;
            });
        });

    });

    describe('check passing in an object to the constructor', function () {

        describe('multiple filters and validators', function () {

            const filters = [ { test: 'ltrim|rtrim|upper'} ];
            const validators = [ { test: 'alpha' } ];

            it('should check the string "   abc   " only contains "ABC" as result', function () {
                const result = new FilterValidate({ test: '   abc   ' }, { filters: filters, validators: validators });
                result.filters.test.should.equal('ABC');
                result.validators.hasOwnProperty('test').should.be.false;
            });

        });

    });

    describe('check addFilter method implementation', function () {
        const filterValidate = new FilterValidate();

        const testToUpperCase = function(property, value) {
            return value.toUpperCase();
        };

        filterValidate.addFilter('testToUpperCase', testToUpperCase);
        it('should check the string "abc" is "ABC" as result', function () {
            filterValidate.filter({ test: 'abc' }, [{test: 'testToUpperCase'}]).test.should.equal('ABC');
        });
    });


    describe('check addValidator method implementation', function () {
        const filterValidate = new FilterValidate();

        const testMaxLen = function(property, value, args) {
            let [len] = args;

            if (typeof len === 'string') {
                len = parseInt(len, 10);
            }

            return (value.length <= len);
        };

        filterValidate.addValidator('testMaxLen', testMaxLen);

        it('should check the string does not exceed max length', function () {
            Object.keys(filterValidate.validate({ test: '12345' }, [ { test: 'maxLen,7' } ])).length.should.equal(0);
        });

    });

});

