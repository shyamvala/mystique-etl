const helper = require('../spec_helper');
const Transformers = require('../../src/transform');
const CustomTransformer = require('../../src/transform/CustomTransformer');

describe("Transformers", () => {

  it("has CustomTransformer as a Transformer", () => {
    expect(Transformers.custom).to.equal(CustomTransformer);
  });

});
