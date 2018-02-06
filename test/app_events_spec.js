const helper = require('./spec_helper');
const AppEvents = require('../src/AppEvents');

describe("application events", () => {

  it("should have an event for Extract Requested event for HTTP JSON", () => {
    expect(AppEvents.HTTP_JSON_EXTRACT_REQUESTED).to.equal('http-json-extract-requested');
  });

  it("should have an event for Extract Successful event for HTTP JSON", () => {
    expect(AppEvents.HTTP_JSON_EXTRACT_SUCCESSFUL).to.equal('http-json-extract-successful');
  });

  it("should have an event for Extract Failed event for HTTP JSON", () => {
    expect(AppEvents.HTTP_JSON_EXTRACT_FAILED).to.equal('http-json-extract-failed');
  });

  it("should have an event for Requested Custom Transform event", () => {
    expect(AppEvents.CUSTOM_TRANSFORM_REQUESTED).to.equal('custom-transform-requested');
  });

  it("should have an event for Successful Custom Transform event", () => {
    expect(AppEvents.CUSTOM_TRANSFORM_SUCCESSFUL).to.equal('custom-transform-successful');
  });

  it("should have an event for Failed Custom Transform event", () => {
    expect(AppEvents.CUSTOM_TRANSFORM_FAILED).to.equal('custom-transform-failed');
  });

  it("should have an event for Requested XSD Validation event", () => {
    expect(AppEvents.XSD_VALIDATION_REQUESTED).to.equal('xsd-validation-requested');
  });

  it("should have an event for Successful XSD Validation event", () => {
    expect(AppEvents.XSD_VALIDATION_SUCCESSFUL).to.equal('xsd-validation-successful');
  });

  it("should have an event for Failed XSD Validation event", () => {
    expect(AppEvents.XSD_VALIDATION_FAILED).to.equal('xsd-validation-failed');
  });

  it("should have an event for Requested S3 Upload event", () => {
    expect(AppEvents.S3_UPLOAD_REQUESTED).to.equal('s3-upload-requested');
  });

  it("should have an event for Successful S3 Upload event", () => {
    expect(AppEvents.S3_UPLOAD_SUCCESSFUL).to.equal('s3-upload-successful');
  });

  it("should have an event for Failed S3 Upload event", () => {
    expect(AppEvents.S3_UPLOAD_FAILED).to.equal('s3-upload-failed');
  });
})
