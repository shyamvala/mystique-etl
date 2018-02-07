const helper = require('../spec_helper');
const InputDataSource = require('../../src/extract/InputDataSource');
const AppEvents = require('../../src/AppEvents');

describe('Extract from input data', () => {

  describe("on success", () => {
    it("should return input data as is", (done) => {
      let inputData = JSON.stringify({"name": "Tyrion", "character": "Smart and Witty"});

      new InputDataSource({data: inputData}, "DataInJob")
        .fetch()
        .then(data => {
          expect(data).to.equal(inputData);
          done();
        })
      });

    it("should emit extract successful event for the given job id", (done) => {
      let inputData = JSON.stringify({"name": "Tyrion", "character": "Smart and Witty"});
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.INPUT_DATA_EXTRACT_SUCCESSFUL, eventSpy);

      new InputDataSource({data: inputData}, "DataInJob")
        .fetch()
        .then(() => {
          expect(eventSpy).to.have.been.calledWith("DataInJob")
          done();
        })
    });
  });
});
