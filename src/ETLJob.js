class ETVLJob {

  withExtractor(extractor) {
    this.extractor = extractor;
    return this;
  }

  withTransformer(transformer) {
    this.transformer = transformer;
    return this;
  }

  withValidator(validator) {
    this.validator = validator;
    return this;
  }

  withLoader(loader) {
    this.loader = loader;
    return this;
  }

  validateForRun() {
    return new Promise((resolve, reject) => {
      if(!this.extractor) {
        return reject("No Extractor configured");
      }
      return resolve(true);
    });
  }

  run() {
    return this.validateForRun()
      .then(() => this.extractor.fetch())
      .then((data) => this.transformer.transform(data))
      .then((transformedData) => this.validator.validate(transformedData))
      .then((transformedData) => this.loader.load(transformedData))
      .catch(error => {
        console.log(error);
        return error;
      })
  }
}

module.exports = ETVLJob;

