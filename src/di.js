const Bottle = require('bottlejs');
const ETLJob = require('./ETLJob');
const ExtractorMap = require('./extract');
const TransformerMap = require('./transform');
const ValidatorMap = require('./validate');
const LoaderMap = require('./load');
const Nightmare = require('nightmare');
const _ = require('lodash');

const Extractors = function(container, configList, jobId) {
  return _.map(configList, (config) => new ExtractorMap[config.type](config, jobId, container));
};

const Transformers = function(container, configList, jobId) {
  return _.map(configList, (config) => new TransformerMap[config.type](config, jobId));
};

const Validator = function(container, config, jobId) {
  let ValidatorType = ValidatorMap[config.type];
  return new ValidatorType(config, jobId);
};

const Loaders = function(container, configList, jobId) {
  return _.map(configList, (config) => new LoaderMap[config.type](config, jobId));
}

const ETLJobRun = function(container, config, jobId) {
    return new ETLJob()
      .withExtractors(container.Extractors.instance(config.extract, jobId))
      .withTransformers(container.Transformers.instance(config.transform, jobId))
      .withValidator(container.Validator.instance(config.validate, jobId))
      .withLoaders(container.Loaders.instance(config.load, jobId));
}

const bottle = new Bottle();
const DI = function() {
  bottle.constant('webScraper', Nightmare({show: false}));
  bottle.instanceFactory('Extractors', Extractors);
  bottle.instanceFactory('Transformers', Transformers);
  bottle.instanceFactory('Validator', Validator);
  bottle.instanceFactory('Loaders', Loaders);
  bottle.instanceFactory('ETLJobRun', ETLJobRun);

  return bottle.container;
}

module.exports = DI;
