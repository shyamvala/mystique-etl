const ETL = require('../');

const HttpXMLExtractJobConfig = {
  extract: [{
    name: "ewr_weather",
    type: "http_xml",
    url: "http://w1.weather.gov/xml/current_obs/KEWR.xml"
  }],
  transform: [{ type: "no_op" }],
  validate: { type: "no_op" },
  load: [{ type: "std_out" }]
};

const lifeCycleListener = {
  onStart: (action, jobName) => {
    console.log(action, jobName);
  },

  onSuccess: (action, jobName) => {
    console.log(action, jobName);
  },

  onFail: (action, jobName) => {
    console.log(action, jobName);
  }
};

new ETL("HttpXMLJob")
  .withJobConfig(HttpXMLExtractJobConfig)
  .withETLLifeCycleEventListener(lifeCycleListener)
  .run()
