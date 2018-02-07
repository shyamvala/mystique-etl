const helper = require('../spec_helper');
const AppEvents = require('../../src/AppEvents');
const NoOpValidator = require('../../src/validate/NoOpValidator');

describe("No Op Validation", () => {

  describe("on success", () => {
    it("should return input data", (done) => {
      new NoOpValidator({type: "no_op"}, "NoOpValidateJob")
        .validate("input data")
        .then((validData) => {
          expect(validData).to.equal("input data");
          done()
        });
    })

    it("should emit Successful Validation event for the job", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.NO_OP_VALIDATION_SUCCESSFUL, eventSpy)

      new NoOpValidator({type: "no_op"}, "NoOpValidateJob")
        .validate("input data")
        .then((isValid) => {
          expect(eventSpy).to.have.been.calledWith("NoOpValidateJob")
          done()
        });
    });

  });

});
