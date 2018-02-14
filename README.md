# Mystique

A simple ETVL - Extract, Transform, Validate and Load tool. Its written in javascript and attempts to provide a simple solution to most common ETL tasks.

- [Getting Started](#getting-started)
- [TODO](#todo)

## Getting Started<a name="getting-started"></a>
```
  let CONFIG = {
    extract: [
      {
        name: "weather_com",
        type: "http_xml",
        url: "http://some.xml.source"
      },
      {
        name: "wunderground_com",
        type: "http_json",
        url: "http://some.json.soure"
      }
    ],
    transform: [
      {
        type: "xml2js",
        element: "weather_com"
      },
      {
        type: "custom",
        transformFunction: function(data, successCB, errorCB) {
          let weatherComData = data.weather_com;
          let wundergroundComData = data.wunderground_com;
          let transformedData = "Transformed Data";
          return successCB(transformedData);
        }
      }
    ],
    validate: {
      type: "no_op"
    },
    load: [
      {
        type: "std_out"
      },
      {
        type: "s3",
        bucketName: "weather-bucket",
        fileName: "weather-2018-01-01"
      }
    ]
  };

  // The listener gives a hook into knowing the current state of the process
  let listener = {
    onStart: (action, jobName) => {},
    onFail: (action, jobName) => {},
    onSuccess: (action, jobName) => {}
  };

  // Instantiate the ETL job and run
  let ETL = require('mystique');
  new ETL("WeatherTransform") // Give the job a name
      .withJobConfig(CONFIG)
      .withETLLifeCycleEventListener(listener)
      .run();
```

Look into examples and tests to get a better understanding.

## TODO<a name="todo"></a>

- Ability to provide custom Extractors, Validators and Loaders
- Store the results of each stage so that they can be restarted from the last stored state
- Ability to have a stream based Extractor
- Ability to skip certain stages without have to no_op them
