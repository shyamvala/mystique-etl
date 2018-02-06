const helper = require('../spec_helper');
const S3Uploader = require('../../src/load/S3Uploader');
var AWS = require('aws-sdk-mock');


describe('Upload to S3', () => {
  after(() => {
    AWS.restore();
  });


  it("should use the given bucketName, fileName and data to upload to S3", () => {
    var s3Spy = sinon.spy();
    AWS.mock('S3', 'putObject', s3Spy);

    new S3Uploader({bucketName: "bucket", fileName: "file"}, "12345").load("<data></data>");

    expect(s3Spy).to.have.been.calledWith({ Body: "<data></data>", Bucket: "bucket", Key: "file" });
  })
});
