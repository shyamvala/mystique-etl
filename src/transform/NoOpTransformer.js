const logger = require('debug');
const AppEvents = require('../AppEvents');

class NoOpTransformer {

  constructor(config, jobId) {
    this.jobId = jobId;
    this.logger = logger(`app:transform:${config.type}:job:${jobId}`);
  }

  transform(data) {
    this.logger("Transforming Data");
    AppEvents.emit(AppEvents.NO_OP_TRANSFORM_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      this.logger("Transformed Data");
      AppEvents.emit(AppEvents.NO_OP_TRANSFORM_SUCCESSFUL, this.jobId);
      resolve(data);
    });
  }
}

module.exports = NoOpTransformer;
