const DI = require("./src/di")();
const AppEvents = require('./src/AppEvents');

class ETL {

  constructor(jobName) {
    this.jobName = jobName;
  }

  validateJobConfig(config) {
    return true;
  }

  withJobConfig(config) {
    validateJobConfig(config);
    this.jobConfig = config;
    return this;
  }

  validateTransformFunction(transformFunction) {
    return true;
  }

  withTransformFunction(transformFunction) {
    validateTransformFunction(transformFunction);
    this.transformFunction = transformFunction;
    return this;
  }

  run() {
    return DI.ETLJobRun.instance(this.jobConfig, this.jobName, this.transformFunction).run();
  }

  events() {
    return AppEvents;
  }
}

module.exports = ETL;
