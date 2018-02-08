const helper = require('./spec_helper');
const ETLJob = require('../src/ETLJob');

describe("etl job run", () => {

  it("should run the etl job with multiple transformers", (done) => {
    let data = "input data to etl";
    let extractor = { fetch: () => Promise.resolve(data), name: "first" };
    let transformer1 = { transform: (data) => Promise.resolve(data.first.split(" ")) };
    let transformer2 = { transform: (data) => Promise.resolve(data.length) }
    let transformer3 = { transform: (data) => Promise.resolve(data+=1) }
    let validator = { validate: (data) => Promise.resolve(data == 5) };
    let loader = { load: (data) => Promise.resolve(data) };

    new ETLJob()
      .withExtractors([extractor])
      .withTransformers([transformer1, transformer2, transformer3])
      .withValidator(validator)
      .withLoaders([loader])
      .run()
      .then(data => {
        expect(data[0]).to.be.true;
        done();
      })
  })

  it("should run the etl job with multiple extractors, transformers and loaders", (done) => {
    let data1 = "first input data to etl";
    let data2 = "second input data to etl";
    let extractor1 = { fetch: () => Promise.resolve(data1), name: "first" };
    let extractor2 = { fetch: () => Promise.resolve(data2), name: "second" };
    let transformer1 = { transform: (data) => Promise.resolve(`${data.first} ${data.second}`) };
    let transformer2 = { transform: (data) => Promise.resolve(data.split(' ').length) }
    let validator = { validate: (data) => Promise.resolve(data) };
    let loader1 = { load: (data) => Promise.resolve(data) };
    let loader2 = { load: (data) => Promise.resolve(data) };

    new ETLJob()
      .withExtractors([extractor1, extractor2])
      .withTransformers([transformer1, transformer2])
      .withValidator(validator)
      .withLoaders([loader1, loader2])
      .run()
      .then(data => {
        expect(data[0]).to.equal(10)
        expect(data[0]).to.equal(data[1]);
        done();
      })
  })
})
