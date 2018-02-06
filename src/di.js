const Bottle = require('bottlejs');
const ETLJob = require('./ETLJob');
const Extractors = require('./extract');
const Transformers = require('./transform');
const Validators = require('./validate');
const Loaders = require('./load');

const Extractor = function(container, config, jobId) {
  return new Extractors[config.type](config, jobId);
};
const Transformer = function(container, config, jobId, transformFunction) {
  return new Transformers[config.type](config, jobId, transformFunction);
};
const Validator = function(container, config, jobId) {
  return new Validators[config.type](config, jobId);
};
const Loader = function(container, config, jobId) {
  return new Loaders[config.type](config, jobId);
}

const ETLJobRun = function(container, config, jobId, transformFunction) {
    return new ETLJob()
      .withExtractor(container.Extractor.instance(config.extract, jobId))
      .withTransformer(container.Transformer.instance(config.transform, jobId, transformFunction))
      .withValidator(container.Validator.instance(config.validate, jobId))
      .withLoader(container.Loader.instance(config.load, jobId));
}

const bottle = new Bottle();
const DI = function() {

  bottle.instanceFactory('Extractor', Extractor);
  bottle.instanceFactory('Transformer', Transformer);
  bottle.instanceFactory('Validator', Validator);
  bottle.instanceFactory('Loader', Loader);
  bottle.instanceFactory('ETLJobRun', ETLJobRun);

  return bottle.container;
}

module.exports = DI;
