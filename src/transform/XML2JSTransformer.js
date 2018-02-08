const logger = require('debug');
const AppEvents = require('../AppEvents');
const parseXMLString = require('xml2js').parseString;

class XML2JSTransformer {

  constructor(config, jobId) {
    this.jobId = jobId;
    this.element = config.element;
    this.logger = logger(`app:transform:${config.type}:job:${jobId}`);
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

      parseXMLString(data[this.element], (err, result) => {
        if(err) return failure(err);
        let transformedData = data;
        transformedData[this.element] = result;
        return success(transformedData);
      });
    });
  }

  get [Symbol.toStringTag]() {
    return 'XML2JSTransformer';
  }
}

module.exports = XML2JSTransformer;
