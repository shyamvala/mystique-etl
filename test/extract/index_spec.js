const helper = require('../spec_helper');
const Extractors = require('../../src/extract');
const HTTPJSONSource = require('../../src/extract/HTTPJSONSource');
const HTTPXMLSource = require('../../src/extract/HTTPXMLSource');
const InputDataSource = require('../../src/extract/InputDataSource');

describe("Extractors", () => {

  it("has HTTPJSONSource as an extractor", () => {
    expect(Extractors.http_json).to.equal(HTTPJSONSource);
  });

  it("has HTTPXMLSource as an extractor", () => {
    expect(Extractors.http_xml).to.equal(HTTPXMLSource);
  });

  it("has InputDataSource as an extractor", () => {
    expect(Extractors.input_data).to.equal(InputDataSource);
  });
});
