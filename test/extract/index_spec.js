const helper = require('../spec_helper');
const Extractors = require('../../src/extract');
const HTTPJSONSource = require('../../src/extract/HTTPJSONSource');

describe("Extractors", () => {

  it("has HTTPJSONSource as an extractor", () => {
    expect(Extractors.http_json).to.equal(HTTPJSONSource);
  });

});
