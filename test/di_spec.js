const helper = require('./spec_helper');
const DI = require('../src/di')();

describe("Dependency Injection", () => {

  it("should return instance of HTTPJSONSource Extractor", () => {
    let extractor = DI.Extractor.instance({type: "http_json", url: "blah.com"}, "12345");

    expect(extractor).to.be.a('HTTPJSONSource');
    expect(extractor.url).to.equal('blah.com');
    expect(extractor.jobId).to.equal('12345');
  });

  it("should return instance of CustomTransformer", () => {
    let transformer = DI.Transformer.instance({type: "custom"}, "12345", "some_function");

    expect(transformer).to.be.a('array');
    expect(transformer[0]).to.be.a('CustomTransformer');
    expect(transformer[0].transformFunction).to.equal("some_function");
  });

  it("should return multiple transformers when type is comma seperated list of types", () => {
    let transformers = DI.Transformer.instance({type: "xml2js;custom"}, "12345", "some_function");

    expect(transformers).to.be.a('array');
    expect(transformers[0]).to.be.a("XML2JSTransformer");
    expect(transformers[1]).to.be.a("CustomTransformer");
  });

  it("should return instance of XSDValidator", () => {
    let validator = DI.Validator.instance({type: "xsd", schema: "blah.xsd"}, "12345");

    expect(validator).to.be.a('XSDValidator');
    expect(validator.schemaFileLocation).to.equal("blah.xsd");
  });

  it("should return instance of S3Uploader", () => {
    let loader = DI.Loader.instance({type: "s3", bucketName: "blah", fileName: "bleh"}, "12345");

    expect(loader).to.be.a('S3Uploader');
    expect(loader.bucketName).to.equal("blah");
    expect(loader.fileName).to.equal("bleh");
  });

  it("should return instance of ETVL Job Run", () => {
    let config = {
      name: "awesomejob",
      extract: {
        url: "http://extract.from.com/feed",
        type: "http_json",
        headers: {}
      },
      transform: {
        type: "custom"
      },
      validate: {
        type: "xsd",
        schema: "schema.xsd"
      },
      load: {
        type: "s3",
        bucketName: "plasticBucket",
        fileName: "water",
        credentials: { secret:"secretString", key: "keyString" }
      }
    };

    let etlJobRun = DI.ETLJobRun.instance(config, "12345");

    expect(etlJobRun.extractor).to.be.a('HTTPJSONSource');
    expect(etlJobRun.transformers).to.be.a('array');
    expect(etlJobRun.transformers[0]).to.be.a('CustomTransformer');
    expect(etlJobRun.validator).to.be.a('XSDValidator');
    expect(etlJobRun.loader).to.be.a('S3Uploader');
  });

  it("should return instance of ETVL Job Run with Multiple Transformers", () => {
    let config = {
      name: "awesomejob",
      extract: {
        url: "http://extract.from.com/feed",
        type: "http_json",
        headers: {}
      },
      transform: {
        type: "xml2js;custom"
      },
      validate: {
        type: "xsd",
        schema: "schema.xsd"
      },
      load: {
        type: "s3",
        bucketName: "plasticBucket",
        fileName: "water",
        credentials: { secret:"secretString", key: "keyString" }
      }
    };

    let etlJobRun = DI.ETLJobRun.instance(config, "12345");

    expect(etlJobRun.extractor).to.be.a('HTTPJSONSource');
    expect(etlJobRun.transformers).to.be.a('array');
    expect(etlJobRun.transformers[0]).to.be.a('XML2JSTransformer');
    expect(etlJobRun.transformers[1]).to.be.a('CustomTransformer');
    expect(etlJobRun.validator).to.be.a('XSDValidator');
    expect(etlJobRun.loader).to.be.a('S3Uploader');
  });
})
