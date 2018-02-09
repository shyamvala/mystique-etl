const ETL = require('../');

const SimpleJobConfig = {
  extract: [{
    name: "input",
    type: "input_data",
    data: "Some Input Data"
  }],
  transform: [{ type: "custom", transformFunction: require('./simpleEtlTransformFunction')}],
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

new ETL("SimpleJob")
  .withJobConfig(SimpleJobConfig)
  .withETLLifeCycleEventListener(lifeCycleListener)
  .run()

