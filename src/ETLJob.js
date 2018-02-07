class ETLJob {

  withExtractor(extractor) {
    this.extractor = extractor;
    return this;
  }

  withTransformers(transformers) {
    this.transformers = transformers;
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

  resolveMultipleTransformers(transformers, data) {
     return transformers.reduce((prev, curr) => prev.then(curr.transform), Promise.resolve(data));
  }

  run() {
    return this.validateForRun()
      .then(() => this.extractor.fetch())
      .then((data) => this.resolveMultipleTransformers(this.transformers, data))
      .then((transformedData) => this.validator.validate(transformedData))
      .then((validatedData) => this.loader.load(validatedData))
      .catch(error => {
        console.log(error);
        return error;
      })
  }
}

module.exports = ETLJob;

