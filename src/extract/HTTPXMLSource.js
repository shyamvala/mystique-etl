const request = require('superagent');
const logger = require('debug');
const AppEvents = require('../AppEvents');

class HTTPXMLSource {

  constructor(config, jobId) {
    this.url = config.url;
    this.jobId = jobId;
    this.logger = logger(`app:extract:${config.type}:job:${jobId}`);
  }

  fetch() {
    this.logger(`Fetching XML Data from URL: ${this.url}`);
    AppEvents.emit(AppEvents.HTTP_XML_EXTRACT_REQUESTED, this.jobId);
    return request
      .get(this.url)
      .buffer()
      .type('xml')
      .then((res) => {
        AppEvents.emit(AppEvents.HTTP_XML_EXTRACT_SUCCESSFUL, this.jobId);
        return Promise.resolve(res.text);
      })
      .catch((err) => {
        AppEvents.emit(AppEvents.HTTP_XML_EXTRACT_FAILED, this.jobId);
        return Promise.reject(err);
      });
  }
}

module.exports = HTTPXMLSource;
