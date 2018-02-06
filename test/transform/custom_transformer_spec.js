const helper = require('../spec_helper');
const superagent = require('superagent');
const AppEvents = require('../../src/AppEvents');
const CustomTransformer = require('../../src/transform/CustomTransformer');


describe("Custom Transform Data", () => {


  describe("on success", () => {
    it("should return transformed data", (done) => {
      let config = { };
      let transformFunction = (data, success, err) => { success("transformed data"); } ;

      new CustomTransformer(config, "12345", transformFunction)
        .transform("input data")
        .then((transformedData) => {
          expect(transformedData).to.equal("transformed data");
          done();
        })
    });


    it("should emit successful transformation event", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.CUSTOM_TRANSFORM_SUCCESSFUL, eventSpy);
      let config = { };
      let transformFunction = (data, success, err) => { success("transformed data"); } ;

      new CustomTransformer(config, "12345", transformFunction)
        .transform("input data")
        .then((transformedData) => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    });
  });

  describe("on failure", () => {
    it("should emit failed transformation event", (done) => {
      let config = { };
      let transformFunction = (data, success, err) => { err("transform error"); } ;
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.CUSTOM_TRANSFORM_FAILED, eventSpy);

      new CustomTransformer(config, "12345", transformFunction)
        .transform("input data")
        .catch(() => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    })
  })

});
