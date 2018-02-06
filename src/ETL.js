const DI = require("./di")();
const AppEvents = require('./AppEvents');

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

  run() {
    return DI.ETLJobRun.instance(this.jobConfig, this.jobName).run();
  }

  events() {
    return AppEvents;
  }
}

module.exports = ETL;
