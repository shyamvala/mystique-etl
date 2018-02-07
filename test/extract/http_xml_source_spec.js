const helper = require('../spec_helper');
const HTTPXMLSource = require('../../src/extract/HTTPXMLSource');
const superagent = require('superagent');
const AppEvents = require('../../src/AppEvents');

describe('Extract from HTTP XML', () => {
  before(() => {
    getRequest = sinon.stub(superagent, 'get');
  });

  after(() => {
    getRequest.restore();
  });

  describe("on success", () => {
    let response = {"text":"<blah>blue</blah>", "status": 200 };
    let getRequestStub = { buffer: () => {
        return {
          type: () => {
            return Promise.resolve(response);
          }
        }
      }
    }
    it("should use the supplied http source url", () => {
      getRequest.returns(getRequestStub)

      new HTTPXMLSource({type: "http_xml", url: "http://extract.from.com/feed/xml"}, "12345").fetch()

      expect(getRequest).to.have.been.calledWith("http://extract.from.com/feed/xml");
    });

    it("should return with object response", (done) => {
      getRequest.returns(getRequestStub)

      new HTTPXMLSource({type: "http_xml", url: "http://extract.from.com/feed/xml"}, "12345")
        .fetch()
        .then(data => {
          expect(data).to.equal("<blah>blue</blah>");
          done();
        }).catch((err) => done(err));
    });

    it("should emit extract successful event for the given job id", (done) => {
      getRequest.returns(getRequestStub)
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.HTTP_XML_EXTRACT_SUCCESSFUL, eventSpy);

      new HTTPXMLSource({type: "http_xml", url: "http://extract.from.com/feed/xml"}, "12345")
        .fetch()
        .then(() => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    });
  });

  describe("on failure", () => {
    let getRequestStub = { buffer: () => {
        return {
          type: () => {
            return Promise.reject({});
          }
        }
      }
    }
    it("should emit extract failed event for the given job id on failed fetch", (done) => {
      getRequest.returns(getRequestStub)
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.HTTP_XML_EXTRACT_FAILED, eventSpy);

      new HTTPXMLSource({typ: "http_xml", url: "http://extract.from.com/feed/xml"}, "12345")
        .fetch()
        .catch(() => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done();
        })
    });
  })
})
