const logger = require('debug');
const AppEvents = require('../AppEvents');
const XSD = require('libxml-xsd');

class XSDValidator {

  constructor(config, jobId) {
    this.schemaFileLocation = config.schema;
    this.jobId = jobId;
    this.logger = logger(`app:validate:${config.type}:job:${jobId}`);
  }


  validate(data) {
    this.logger(`Validating Data`);
    AppEvents.emit(AppEvents.XSD_VALIDATION_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      XSD.parseFile(this.schemaFileLocation, (parseError, schema) => {
        if(parseError) {
          this.logger(`Validating Data Failed due to Schema File Error`);
          AppEvents.emit(AppEvents.XSD_VALIDATION_FAILED, this.jobId);
          return reject([parseError]);
        }
        this.logger(data);
        schema.validate(data, (technicalError, validationErrors) => {
          if(technicalError) {
            this.logger(`Validating Data Failed due to a Technical Error`);
            AppEvents.emit(AppEvents.XSD_VALIDATION_FAILED, this.jobId);
            return reject([technicalError]);
          }
          if(validationErrors != null) {
            this.logger(`Validating Data Failed due to a Validation error`);
            AppEvents.emit(AppEvents.XSD_VALIDATION_FAILED, this.jobId);
            return reject(validationErrors);
          }
          this.logger(`Validating Data Succeeded`);
          AppEvents.emit(AppEvents.XSD_VALIDATION_SUCCESSFUL, this.jobId);
          return resolve(data);
        });
      });
    });
  }

  get [Symbol.toStringTag]() {
    return 'XSDValidator';
  }
}

module.exports = XSDValidator;
