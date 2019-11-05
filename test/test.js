const should = require('chai').should();
const filterValidate = require("../index").filterValidate;

// describe('deep property check', function () {
//     it('should check all properties exist', function () {
//         validChain({level1: {level2: {level3: {level4: true}}}}, 'level1.level2.level3.level4').should.equal(true);
//     });
//
//     it('should check a property does not exist', function () {
//         validChain({level1: {level2: {level3: {level4: true}}}}, 'level1.level2.level3.level4.level5').should.equal(false);
//     });
// });
describe('check validators', function () {
    it('should check a property exists', function () {
            const object = {
                name: 'Calvin'
            };

            const validators = [
                {
                    name: 'required'
                }
            ];

        filterValidate(object, validators, null).should.equal(true);
    });
});
