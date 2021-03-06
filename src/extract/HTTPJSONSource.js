const request = require('superagent');
const logger = require('debug');
const AppEvents = require('../AppEvents');

class HTTPJSONSource {

  constructor(config, jobId) {
    this.name = config.name;
    this.url = config.url;
    this.headers = config.headers || {};
    this.jobId = jobId;
    this.logger = logger(`app:extract:${config.type}:job:${jobId}`);
  }

  fetch() {
    this.logger(`Fetching Data from URL: ${this.url}`);
    AppEvents.emit(AppEvents.HTTP_JSON_EXTRACT_REQUESTED, this.jobId);
    return request
      .get(this.url)
      .set(this.headers)
      .then((res) => {
        this.logger(`Fetched Data`);
        AppEvents.emit(AppEvents.HTTP_JSON_EXTRACT_SUCCESSFUL, this.jobId);
        return Promise.resolve(res.body);
      })
      .catch((err) => {
        this.logger(`Failed Fetching Data`);
        AppEvents.emit(AppEvents.HTTP_JSON_EXTRACT_FAILED, this.jobId);
        return Promise.reject(err);
      })
  }

  get [Symbol.toStringTag]() {
    return 'HTTPJSONSource';
  }
}

module.exports = HTTPJSONSource;
