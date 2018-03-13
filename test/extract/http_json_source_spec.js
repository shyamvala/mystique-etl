const helper = require('../spec_helper');
const HTTPJSONSource = require('../../src/extract/HTTPJSONSource');
const superagent = require('superagent');
const AppEvents = require('../../src/AppEvents');

describe('Extract from HTTP', () => {
  before(() => {
    getRequest = sinon.stub(superagent, 'get');
  });

  after(() => {
    getRequest.restore();
  });

  describe("on success", () => {
    it("should use the supplied http source url", () => {
      let response = {"body":{"response": true }, "status": 200 };
      getRequest.returns({set: () => Promise.resolve(response)});

      new HTTPJSONSource({type:"http_json", url: "http://extract.from.com/feed"}, "12345").fetch()

      expect(getRequest).to.have.been.calledWith("http://extract.from.com/feed");
    });

    it("should return with JSON object response", (done) => {
      let response = {"body":{"response": true }, "status": 200 };
      getRequest.returns({set: () => Promise.resolve(response)});

      new HTTPJSONSource({type:"http_json", url: "http://extract.from.com/feed"}, "12345")
        .fetch()
        .then(data => {
          expect(data.response).to.be.true;
          done();
        }).catch((err) => done(err));
    });

    it("should emit extract successful event for the given job id", (done) => {
      let response = {"body":{"response": true }, "status": 200 };
      getRequest.returns({set: () => Promise.resolve(response)});
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.HTTP_JSON_EXTRACT_SUCCESSFUL, eventSpy);

      new HTTPJSONSource({type:"http_json", url: "http://extract.from.com/feed"}, "12345")
        .fetch()
        .then(() => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    });
  });

  describe("on failure", () => {
    it("should emit extract failed event for the given job id on failed fetch", (done) => {
      getRequest.returns({set: () => Promise.reject({})});
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.HTTP_JSON_EXTRACT_FAILED, eventSpy);

      new HTTPJSONSource({type:"http_json", url: "http://extract.from.com/feed"}, "12345")
        .fetch()
        .catch(() => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    });
  })
})
