const helper = require('../spec_helper');
const superagent = require('superagent');
const AppEvents = require('../../src/AppEvents');
const XML2JSTransformer = require('../../src/transform/XML2JSTransformer');


describe("XML to JS Transform Data", () => {


  describe("on success", () => {
    it("should return transformed data", (done) => {
      new XML2JSTransformer({type: "xml2js"}, "12345")
        .transform("<blah>blue</blah>")
        .then((transformedData) => {
          expect(transformedData.blah).to.equal("blue");
          done();
        })
    });


    it("should emit successful transformation event", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.XML2JS_TRANSFORM_SUCCESSFUL, eventSpy);
      let transformFunction = (data, success, err) => { success("transformed data"); } ;

      new XML2JSTransformer({type: "xml2js"}, "12345")
        .transform("<blah>blue</blah>")
        .then((transformedData) => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    });
  });

  describe("on failure", () => {
    it("should emit failed transformation event", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.XML2JS_TRANSFORM_FAILED, eventSpy);

      new XML2JSTransformer({type: "xml2js"}, "12345")
        .transform("invalid_xml_content")
        .catch(() => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    })
  })

});
