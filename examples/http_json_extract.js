const ETL = require('../');

const HttpJSONExtractJobConfig = {
  extract: [{
    name: "dogs",
    type: "http_json",
    url: "https://dog.ceo/api/breeds/list/all"
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

new ETL("HttpJSONJob")
  .withJobConfig(HttpJSONExtractJobConfig)
  .withETLLifeCycleEventListener(lifeCycleListener)
  .run()
