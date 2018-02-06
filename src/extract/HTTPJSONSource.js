const request = require('superagent');
const logger = require('debug');
const AppEvents = require('../AppEvents');

class HTTPJSONSource {

  constructor(config, jobId) {
    this.url = config.url;
    this.jobId = jobId;
    this.logger = logger(`app:extract:http_json_source:job:${jobId}`);
  }

  fetch() {
    this.logger(`Fetching Data from URL: ${this.url}`);
    AppEvents.emit(AppEvents.HTTP_JSON_EXTRACT_REQUESTED, this.jobId);
    return request.get(this.url)
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
