const helper = require('./spec_helper');
const ETLJob = require('../src/ETLJob');

describe("etl job run", () => {

  it("should run the etl job with multiple transformers", (done) => {
    let data = "input data to etl";
    let extractor = { fetch: () => Promise.resolve(data) };
    let transformer1 = { transform: (data) => Promise.resolve(data.split(" ")) };
    let transformer2 = { transform: (data) => Promise.resolve(data.length) }
    let transformer3 = { transform: (data) => Promise.resolve(data+=1) }
    let validator = { validate: (data) => Promise.resolve(data == 5) };
    let loader = { load: (data) => Promise.resolve(data) };

    new ETLJob()
      .withExtractor(extractor)
      .withTransformers([transformer1, transformer2, transformer3])
      .withValidator(validator)
      .withLoader(loader)
      .run()
      .then(data => {
        expect(data).to.be.true;
        done();
      })

  })
})
