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
    return this.webScraper.goto(this.config.url)
      .evaluate(this.config.evaluator)
      .then(data => data)
  }

  get [Symbol.toStringTag]() {
    return 'WebpageSource';
  }
}

module.exports = WebpageSource;
