const ETL = require('../');
const path = require('path');

const FileExtractJobConfig = {
  extract: [{
    name: "dogs",
    type: "file",
    file: path.join(__dirname, 'data', 'dogs.xml')
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

new ETL("FileExtractJob")
  .withJobConfig(FileExtractJobConfig)
  .withETLLifeCycleEventListener(lifeCycleListener)
  .run()
