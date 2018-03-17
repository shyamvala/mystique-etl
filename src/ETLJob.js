const logger = require('debug')('app:etljob');
const _ = require('lodash');

class ETLJob {

  withExtractors(extractors) {
    this.extractors = extractors;
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

  withLoaders(loaders) {
    this.loaders = loaders;
    return this;
  }

  validateForRun() {
    return new Promise((resolve, reject) => {
      if(!this.extractors) {
        return reject("No Extractors configured");
      }
      return resolve(true);
    });
  }

  resolveMultipleExtractors(extractors) {
    let extractorNames = extractors.map(extractor => extractor.name);
    let extractorPromises = extractors.map(extractor => extractor.fetch());
    return Promise.all(extractorPromises)
      .then(dataArray => {
        return _.zipObject(extractorNames, dataArray);
      });
  }

  resolveMultipleTransformers(transformers, data) {
    let transformerPromises = transformers.map(transformer => transformer.transform.bind(transformer));
    return transformerPromises.reduce(function (pacc, transformerPromise) {
      return pacc = pacc.then(data => transformerPromise(data));
    }, Promise.resolve(data));
  }

  resolveMultipleLoaders(loaders, data) {
    let loaderPromises = loaders.map(loader => loader.load(data));
    return Promise.all(loaderPromises);
  }

  run() {
    return this.validateForRun()
      .then(() => this.resolveMultipleExtractors(this.extractors))
      .then((data) => this.resolveMultipleTransformers(this.transformers, data))
      .then((transformedData) => this.validator.validate(transformedData))
      .then((validatedData) => this.resolveMultipleLoaders(this.loaders,validatedData))
      .catch(error => {
        logger(error);
        throw error;
      })
  }
}

module.exports = ETLJob;

