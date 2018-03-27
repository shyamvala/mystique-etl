const logger = require('debug');
const AppEvents = require('../AppEvents');
const fs = require('fs');

class FileSource {

  constructor(config, jobId) {
    this.name = config.name;
    this.config = config;
    this.jobId = jobId;
    this.logger = logger(`app:extract:${config.type}:job:${jobId}`);
  }

  fetch() {
    this.logger('Fetching File Data');
    AppEvents.emit(AppEvents.FILE_EXTRACT_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      fs.readFile(this.config.file, "utf8", (err, data) => {
        if(err) {
          AppEvents.emit(AppEvents.FILE_EXTRACT_FAILED, this.jobId);
          reject(err);
          return;
        }
        AppEvents.emit(AppEvents.FILE_EXTRACT_SUCCESSFUL, this.jobId);
        resolve(data.replace(/\r|\n/g, ''));
      });
    });
  }

  get [Symbol.toStringTag]() {
    return 'FileSource';
  }
}

module.exports = FileSource;
