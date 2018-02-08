const helper = require('./spec_helper');
const DI = require('../src/di')();

describe("Dependency Injection", () => {

  it("should return single extractor", () => {
    let extractors = DI.Extractors.instance([{type: "http_json", url: "blah.com"}], "12345");

    expect(extractors).to.be.a('array');
    expect(extractors[0]).to.be.a('HTTPJSONSource');
    expect(extractors[0].url).to.equal('blah.com');
    expect(extractors[0].jobId).to.equal('12345');
  });

  it("should return multiple extractors", () => {
    let extractors = DI.Extractors.instance([{type: "http_json", url: "blah.com"}, {type: "http_xml", url: "blue.com"}], "12345");

    expect(extractors).to.be.a('array');
    expect(extractors[0]).to.be.a('HTTPJSONSource');
    expect(extractors[0].url).to.equal('blah.com');
    expect(extractors[0].jobId).to.equal('12345');
    expect(extractors[1]).to.be.a('HTTPXMLSource');
    expect(extractors[1].url).to.equal('blue.com');
    expect(extractors[1].jobId).to.equal('12345');
  });

  it("should return instance of CustomTransformer", () => {
    let transformers = DI.Transformers.instance([{type: "custom"}], "12345", "some_function");

    expect(transformers).to.be.a('array');
    expect(transformers[0]).to.be.a('CustomTransformer');
    expect(transformers[0].transformFunction).to.equal("some_function");
  });

  it("should return multiple transformers when type is comma seperated list of types", () => {
    let transformers = DI.Transformers.instance([{type: "xml2js"}, {type: "custom"}], "12345", "some_function");

    expect(transformers).to.be.a('array');
    expect(transformers[0]).to.be.a("XML2JSTransformer");
    expect(transformers[1]).to.be.a("CustomTransformer");
  });

  it("should return instance of XSDValidator", () => {
    let validator = DI.Validator.instance({type: "xsd", schema: "blah.xsd"}, "12345");

    expect(validator).to.be.a('XSDValidator');
    expect(validator.schemaFileLocation).to.equal("blah.xsd");
  });

  it("should return single loader", () => {
    let loaders = DI.Loaders.instance([{type: "s3", bucketName: "blah", fileName: "bleh"}], "12345");

    expect(loaders).to.be.a('array');
    expect(loaders[0]).to.be.a('S3Uploader');
    expect(loaders[0].bucketName).to.equal("blah");
    expect(loaders[0].fileName).to.equal("bleh");
  });

  it("should return multiple loaders", () => {
    let loaders = DI.Loaders.instance([{type: "s3", bucketName: "blah", fileName: "bleh"}, {type: "std_out"}], "12345");

    expect(loaders).to.be.a('array');
    expect(loaders[0]).to.be.a('S3Uploader');
    expect(loaders[0].bucketName).to.equal("blah");
    expect(loaders[0].fileName).to.equal("bleh");
    expect(loaders[1]).to.be.a('StdOut');
  });

  it("should return instance of ETVL Job Run", () => {
    let config = {
      name: "awesomejob",
      extract: [{
        url: "http://extract.from.com/feed",
        type: "http_json",
        headers: {}
      }],
      transform: [{
        type: "custom"
      }],
      validate: {
        type: "xsd",
        schema: "schema.xsd"
      },
      load: [{
        type: "s3",
        bucketName: "plasticBucket",
        fileName: "water",
        credentials: { secret:"secretString", key: "keyString" }
      }]
    };

    let etlJobRun = DI.ETLJobRun.instance(config, "12345");

    expect(etlJobRun.extractors).to.be.a('array');
    expect(etlJobRun.extractors[0]).to.be.a('HTTPJSONSource');
    expect(etlJobRun.transformers).to.be.a('array');
    expect(etlJobRun.transformers[0]).to.be.a('CustomTransformer');
    expect(etlJobRun.validator).to.be.a('XSDValidator');
    expect(etlJobRun.loaders).to.be.a('array');
    expect(etlJobRun.loaders[0]).to.be.a('S3Uploader');
  });

  it("should return instance of ETVL Job Run with Multiple Extractors, Transformers and Loaders", () => {
    let config = {
      name: "awesomejob",
      extract: [{
        url: "http://extract.from.com/feed",
        type: "http_json",
      }, {
        type: "input_data",
        data: "blahblue"
      }],
      transform: [{ type: "xml2js" }, {type: "custom"}],
      validate: {
        type: "xsd",
        schema: "schema.xsd"
      },
      load: [{
        type: "s3",
        bucketName: "plasticBucket",
        fileName: "water",
        credentials: { secret:"secretString", key: "keyString" }
      }, {
        type: "std_out"
      }]
    };

    let etlJobRun = DI.ETLJobRun.instance(config, "12345");

    expect(etlJobRun.extractors).to.be.a('array');
    expect(etlJobRun.extractors[0]).to.be.a('HTTPJSONSource');
    expect(etlJobRun.extractors[1]).to.be.a('InputDataSource');
    expect(etlJobRun.transformers).to.be.a('array');
    expect(etlJobRun.transformers[0]).to.be.a('XML2JSTransformer');
    expect(etlJobRun.transformers[1]).to.be.a('CustomTransformer');
    expect(etlJobRun.validator).to.be.a('XSDValidator');
    expect(etlJobRun.loaders).to.be.a('array');
    expect(etlJobRun.loaders[0]).to.be.a('S3Uploader');
    expect(etlJobRun.loaders[1]).to.be.a('StdOut');
  });
})
