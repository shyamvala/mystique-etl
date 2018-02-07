const logger = require('debug');
const AppEvents = require('../AppEvents');

class NoOpValidator {

  constructor(config, jobId) {
    this.jobId = jobId;
    this.logger = logger(`app:validate:${config.type}:job:${jobId}`);
  }


  validate(data) {
    this.logger('Validating Data');
    AppEvents.emit(AppEvents.NO_OP_VALIDATION_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      this.logger(`Validating Data Succeeded`);
      AppEvents.emit(AppEvents.NO_OP_VALIDATION_SUCCESSFUL, this.jobId);
      return resolve(data);
    });
  }
}

module.exports = NoOpValidator;
