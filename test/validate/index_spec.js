const helper = require('../spec_helper');
const Validators = require('../../src/validate');
const XSDValidator = require('../../src/validate/XSDValidator');
const NoOpValidator = require('../../src/validate/NoOpValidator');

describe("Validators", () => {

  it("has XSDValidator as a Validator", () => {
    expect(Validators.xsd).to.equal(XSDValidator);
  });

  it("has NoOpValidator as a Validator", () => {
    expect(Validators.no_op).to.equal(NoOpValidator);
  });
});
