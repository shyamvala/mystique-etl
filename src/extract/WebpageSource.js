const logger = require('debug');
const AppEvents = require('../AppEvents');
class WebpageSource {

  constructor(config, jobId, container) {
    this.name = config.name;
    this.config = config;
    this.jobId = jobId;
    this.webScraper = container.webScraper;
    this.logger = logger(`app:extract:${config.type}:job:${jobId}`);
  }

  fetch() {
    this.logger('Scraping webpage');
    AppEvents.emit(AppEvents.WEBPAGE_EXTRACT_REQUESTED, this.jobId);
    return this.webScraper.goto(this.config.url)
      .evaluate(this.config.evaluator)
      .then(data => {
        AppEvents.emit(AppEvents.WEBPAGE_EXTRACT_SUCCESSFUL, this.jobId);
        return data
      })
      .catch((err) => {
        AppEvents.emit(AppEvents.WEBPAGE_EXTRACT_FAILED, this.jobId);
        return Promise.reject(err);
      });
  }

  get [Symbol.toStringTag]() {
    return 'WebpageSource';
  }
}

module.exports = WebpageSource;
