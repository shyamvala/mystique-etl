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
    this.validateJobConfig(config);
    this.jobConfig = config;
    return this;
  }

  withETLLifeCycleEventListener(lifeCycleListener) {
    this.lifeCycleListener = lifeCycleListener;
    return this;
  }

  run() {
    AppEvents.registerEventsToLifeCycleListener(this.lifeCycleListener);
    return DI.ETLJobRun.instance(this.jobConfig, this.jobName).run();
  }

}

module.exports = ETL;
