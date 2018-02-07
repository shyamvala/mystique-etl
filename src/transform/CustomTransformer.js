const logger = require('debug');
const AppEvents = require('../AppEvents');

class CustomTransformer {

  constructor(config, jobId, transformFunction) {
    this.transformFunction = transformFunction;
    this.jobId = jobId;
    this.logger = logger(`app:transform:${config.type}:job:${jobId}`);
  }

  transform(data) {
    this.logger(`Transforming Data`);
    AppEvents.emit(AppEvents.CUSTOM_TRANSFORM_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      let success = (transformedData) => {
        this.logger("Transformed Data");
        AppEvents.emit(AppEvents.CUSTOM_TRANSFORM_SUCCESSFUL, this.jobId);
        resolve(transformedData);
      };

      let failure = (error) => {
        this.logger("Transforming Error");
        AppEvents.emit(AppEvents.CUSTOM_TRANSFORM_FAILED, this.jobId);
        reject(error);
      };
      this.transformFunction(data, success, failure);
    });
  }

  get [Symbol.toStringTag]() {
    return 'CustomTransformer';
  }
}

module.exports = CustomTransformer;
