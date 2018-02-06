const helper = require('../spec_helper');
const Validators = require('../../src/validate');
const XSDValidator = require('../../src/validate/XSDValidator');

describe("Validators", () => {

  it("has XSDValidator as a Validator", () => {
    expect(Validators.XSD).to.equal(XSDValidator);
  });

});
