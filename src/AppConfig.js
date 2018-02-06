const _ = require('lodash');

class AppConfig {

  constructor(config, ...jobs) {
    this.config = config;
    this.jobs = jobs;
    this.matchingConfigJobs = _.filter(config.jobs, (job) => _.includes(jobs, job.name));
  }

  build(config) {
    return this.matchingConfigJobs;
  }

}

module.exports = AppConfig;
