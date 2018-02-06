const helper = require('../spec_helper');
const Loaders = require('../../src/load');
const S3Uploader = require('../../src/load/S3Uploader');

describe("Loaders", () => {

  it("has S3Uploader as a Loader", () => {
    expect(Loaders.s3).to.equal(S3Uploader);
  });

});
