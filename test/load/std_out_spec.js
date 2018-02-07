const helper = require('../spec_helper');
const AppEvents = require('../../src/AppEvents');
const StdOut = require('../../src/load/StdOut');


describe('Std Out Load', () => {

  it("should output the data to console and return data", (done) => {
    new StdOut({type: "std_out"}, "LoadJob")
      .load("input data")
      .then(data => {
        expect(data).to.equal("input data")
        done();
      })
  })

    it("should emit successful load event", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.STD_OUT_LOAD_SUCCESSFUL, eventSpy);

      new StdOut({type: "std_out"}, "12345")
        .load("input data")
        .then((_) => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    });
});
