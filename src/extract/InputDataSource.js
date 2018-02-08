const logger = require('debug');
const AppEvents = require('../AppEvents');

class InputDataSource {

  constructor(config, jobId) {
    this.name = config.name;
    this.config = config;
    this.jobId = jobId;
    this.logger = logger(`app:extract:${config.type}:job:${jobId}`);
  }

  fetch() {
    this.logger('Fetching Input Data ');
    AppEvents.emit(AppEvents.INPUT_DATA_EXTRACT_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      AppEvents.emit(AppEvents.INPUT_DATA_EXTRACT_SUCCESSFUL, this.jobId);
      resolve(this.config.data);
    });
  }

  get [Symbol.toStringTag]() {
    return 'InputDataSource';
  }
}

module.exports = InputDataSource;
