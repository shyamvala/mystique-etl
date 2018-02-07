const helper = require('../spec_helper');
const Transformers = require('../../src/transform');
const XML2JSTransformer = require('../../src/transform/XML2JSTransformer');
const CustomTransformer = require('../../src/transform/CustomTransformer');
const NoOpTransformer = require('../../src/transform/NoOpTransformer');

describe("Transformers", () => {

  it("has XML2JSTransformer as a Transformer", () => {
    expect(Transformers.xml2js).to.equal(XML2JSTransformer);
  });

  it("has CustomTransformer as a Transformer", () => {
    expect(Transformers.custom).to.equal(CustomTransformer);
  });

  it("has NoOpTransformer as a Transformer", () => {
    expect(Transformers.no_op).to.equal(NoOpTransformer);
  });
});
