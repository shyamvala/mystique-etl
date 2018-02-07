const Bottle = require('bottlejs');
const ETLJob = require('./ETLJob');
const Extractors = require('./extract');
const Transformers = require('./transform');
const Validators = require('./validate');
const Loaders = require('./load');
const _ = require('lodash');

const Extractor = function(container, config, jobId) {
  let ExtractorType = Extractors[config.type];
  return new ExtractorType(config, jobId);
};
const Transformer = function(container, config, jobId, transformFunction) {
  return _.map(_.uniq(_.split(config.type, ";")), (type) => new Transformers[type](config, jobId, transformFunction));
};
const Validator = function(container, config, jobId) {
  let ValidatorType = Validators[config.type];
  return new ValidatorType(config, jobId);
};
const Loader = function(container, config, jobId) {
  let LoaderType = Loaders[config.type];
  return new LoaderType(config, jobId);
}

const ETLJobRun = function(container, config, jobId, transformFunction) {
    return new ETLJob()
      .withExtractor(container.Extractor.instance(config.extract, jobId))
      .withTransformers(container.Transformer.instance(config.transform, jobId, transformFunction))
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
