const logger = require('debug');
const AppEvents = require('../AppEvents');
const parseXMLString = require('xml2js').parseString;

class XML2JSTransformer {

  constructor(config, jobId) {
    this.jobId = jobId;
    this.logger = logger(`app:transform:xml2js:job:${jobId}`);
  }

  transform(data) {
    this.logger(`Transforming Data`);
    AppEvents.emit(AppEvents.XML2JS_TRANSFORM_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      let success = (transformedData) => {
        this.logger("Transformed Data");
        AppEvents.emit(AppEvents.XML2JS_TRANSFORM_SUCCESSFUL, this.jobId);
        resolve(transformedData);
      };

      let failure = (error) => {
        this.logger("Transforming Error");
        AppEvents.emit(AppEvents.XML2JS_TRANSFORM_FAILED, this.jobId);
        reject(error);
      };

      parseXMLString(data, (err, result) => {
        if(err) return failure(err);
        return success(result);
      });
    });
  }

  get [Symbol.toStringTag]() {
    return 'XML2JSTransformer';
  }
}

module.exports = XML2JSTransformer;
