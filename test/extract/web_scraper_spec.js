const helper = require('../spec_helper');
const WebpageSource = require('../../src/extract/WebpageSource');
const AppEvents = require('../../src/AppEvents');
const NightmareInterface = class {
  goto() {}
}
const nightmare = new NightmareInterface()

describe('Extract from a website', () => {
  var nightmareEvaluateStub, nightmareGoToStub, evaluatorStub;

  before((done) => {
    nightmareGoToStub = sinon.stub(nightmare, 'goto')
    nightmareEvaluateStub = sinon.stub()
    evaluatorStub = sinon.stub()
    done()
  });

  after((done) => {
    nightmareGoToStub.restore();
    done()
  });

  describe("on success", () => {

    let testIds = ["test-id-1", "test-id-2"];

    it("should call the provided url source", (done) => {
      let gotoResponse = { evaluate: nightmareEvaluateStub };
      nightmareGoToStub.withArgs('www.google.com').returns(gotoResponse)
      nightmareEvaluateStub.withArgs(evaluatorStub).resolves(testIds)

      new WebpageSource({ name: 'google',
                          type:'webpage',
                          url: "www.google.com",
                          evaluator: evaluatorStub}, "test-web-scrape-job", { 'webScraper': nightmare})
        .fetch()
        .then(data => {
          expect(data).to.eql(testIds)
          done()
        })

    });
  });
});
