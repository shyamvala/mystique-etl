const helper = require('../spec_helper');
const AppEvents = require('../../src/AppEvents');
const NoOpTransformer = require('../../src/transform/NoOpTransformer');


describe("No Op Transform Data", () => {
  describe("on success", () => {
    it("should return the input data", (done) => {
      let config = { };

      new NoOpTransformer(config, "NoOpTransformJob")
        .transform("input data")
        .then(data => {
          expect(data).to.equal("input data");
          done();
        })
    });

    it("should emit successful transformation event", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.NO_OP_TRANSFORM_SUCCESSFUL, eventSpy);
      let config = { };

      new NoOpTransformer(config, "12345")
        .transform("input data")
        .then((transformedData) => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        });
    });
  });
});
