const helper = require('../spec_helper');
const Loaders = require('../../src/load');
const S3Uploader = require('../../src/load/S3Uploader');
const StdOut = require('../../src/load/StdOut');

describe("Loaders", () => {

  it("has S3Uploader as a Loader", () => {
    expect(Loaders.s3).to.equal(S3Uploader);
  });

  it("has StdOut as a Loader", () => {
    expect(Loaders.std_out).to.equal(StdOut);
  });
});
