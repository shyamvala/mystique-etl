const helper = require('./spec_helper');
const AppEvents = require('../src/AppEvents');

describe("application events", () => {

  // Extract Events

  it("should have an event for Extract Requested event for File Data", () => {
    expect(AppEvents.FILE_EXTRACT_REQUESTED).to.equal('file-extract-requested');
  });

  it("should have an event for Extract Successful event for File Data", () => {
    expect(AppEvents.FILE_EXTRACT_SUCCESSFUL).to.equal('file-extract-successful');
  });

  it("should have an event for Extract Requested event for Input Data", () => {
    expect(AppEvents.INPUT_DATA_EXTRACT_REQUESTED).to.equal('input-data-extract-requested');
  });

  it("should have an event for Extract Successful event for Input Data", () => {
    expect(AppEvents.INPUT_DATA_EXTRACT_SUCCESSFUL).to.equal('input-data-extract-successful');
  });

  it("should have an event for Extract Requested event for HTTP XML", () => {
    expect(AppEvents.HTTP_XML_EXTRACT_REQUESTED).to.equal('http-xml-extract-requested');
  });

  it("should have an event for Extract Successful event for HTTP XML", () => {
    expect(AppEvents.HTTP_XML_EXTRACT_SUCCESSFUL).to.equal('http-xml-extract-successful');
  });

  it("should have an event for Extract Failed event for HTTP XML", () => {
    expect(AppEvents.HTTP_XML_EXTRACT_FAILED).to.equal('http-xml-extract-failed');
  });

  it("should have an event for Extract Requested event for HTTP JSON", () => {
    expect(AppEvents.HTTP_JSON_EXTRACT_REQUESTED).to.equal('http-json-extract-requested');
  });

  it("should have an event for Extract Successful event for HTTP JSON", () => {
    expect(AppEvents.HTTP_JSON_EXTRACT_SUCCESSFUL).to.equal('http-json-extract-successful');
  });

  it("should have an event for Extract Failed event for HTTP JSON", () => {
    expect(AppEvents.HTTP_JSON_EXTRACT_FAILED).to.equal('http-json-extract-failed');
  });

  it("should have an event for Extract Requested event for Webpage", () => {
    expect(AppEvents.WEBPAGE_EXTRACT_REQUESTED).to.equal('webpage-extract-requested');
  });

  it("should have an event for Extract Successful event for Webpage", () => {
    expect(AppEvents.WEBPAGE_EXTRACT_SUCCESSFUL).to.equal('webpage-extract-successful');
  });

  it("should have an event for Extract Failed event for Webpage", () => {
    expect(AppEvents.WEBPAGE_EXTRACT_FAILED).to.equal('webpage-extract-failed');
  });

  //Transform Events

  it("should have an event for Requested No Op Transform event", () => {
    expect(AppEvents.NO_OP_TRANSFORM_REQUESTED).to.equal('no-op-transform-requested');
  });

  it("should have an event for Successful No Op Transform event", () => {
    expect(AppEvents.NO_OP_TRANSFORM_SUCCESSFUL).to.equal('no-op-transform-successful');
  });

  it("should have an event for Requested XML2JS Transform event", () => {
    expect(AppEvents.XML2JS_TRANSFORM_REQUESTED).to.equal('xml2js-transform-requested');
  });

  it("should have an event for Successful XML2JS Transform event", () => {
    expect(AppEvents.XML2JS_TRANSFORM_SUCCESSFUL).to.equal('xml2js-transform-successful');
  });

  it("should have an event for Failed XML2JS Transform event", () => {
    expect(AppEvents.XML2JS_TRANSFORM_FAILED).to.equal('xml2js-transform-failed');
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

  // Validate Events

  it("should have an event for Requested No Op Validation event", () => {
    expect(AppEvents.NO_OP_VALIDATION_REQUESTED).to.equal('no-op-validation-requested');
  });

  it("should have an event for Successful No Op Validation event", () => {
    expect(AppEvents.NO_OP_VALIDATION_SUCCESSFUL).to.equal('no-op-validation-successful');
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

  // LOAD Events

  it("should have an event for Requested S3 Upload event", () => {
    expect(AppEvents.S3_UPLOAD_REQUESTED).to.equal('s3-upload-requested');
  });

  it("should have an event for Successful S3 Upload event", () => {
    expect(AppEvents.S3_UPLOAD_SUCCESSFUL).to.equal('s3-upload-successful');
  });

  it("should have an event for Failed S3 Upload event", () => {
    expect(AppEvents.S3_UPLOAD_FAILED).to.equal('s3-upload-failed');
  });

  it("should have an event for Requested Std Out Load event", () => {
    expect(AppEvents.STD_OUT_LOAD_REQUESTED).to.equal('std-out-load-requested');
  });

  it("should have an event for Successful Std Out Load event", () => {
    expect(AppEvents.STD_OUT_LOAD_SUCCESSFUL).to.equal('std-out-load-successful');
  });
})
