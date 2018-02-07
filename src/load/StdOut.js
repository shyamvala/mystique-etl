const logger = require('debug');
const AppEvents = require('../AppEvents');

class StdOut {

  constructor(config, jobId) {
    this.jobId = jobId;
    this.logger = logger(`app:load:${config.type}:job:${jobId}`);
  }

  load(data) {
    this.logger('Load Request to Std Out')
    AppEvents.emit(AppEvents.STD_OUT_LOAD_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      this.logger('Load Data to Std Out')
      AppEvents.emit(AppEvents.STD_OUT_LOAD_SUCCESSFUL, this.jobId);
      console.log(data);
      return resolve(data);
    });
  }
}

module.exports = StdOut;
