const helper = require('./spec_helper');
const AppConfig = require('../src/AppConfig');

describe("Load Config", () => {

  it("should load all the job configs", () => {
    let configObject = {
      jobs: [
        { name: "awesomejob1",
          extract: {
            url: "http://extract.from.com/feed",
            type: "http-json",
            headers: {}
          },
          load: {
            type: "s3",
            bucketName: "plasticBucket",
            fileName: "water",
            credentials: { secret:"secretString", key: "keyString" }
          }
        },
        { name: "awesomejob2",
          extract: {
            url: "http://extract.from.com/feed",
            type: "http-json",
            headers: {}
          },
          transform: {
            type: "custom",
            file: "OrdersJsonToXML"
          },
          validate: {
            type: "XSD",
            schema: "schema.xsd"
          },
          load: {
            type: "s3",
            bucketName: "plasticBucket",
            fileName: "water",
            credentials: { secret:"secretString", key: "keyString" }
          }
        }
      ]
    };

    let configs = new AppConfig(configObject, "awesomejob2").build();
    expect(configs).to.be.an('array');
    expect(configs.length).to.equal(1);
  })
})
