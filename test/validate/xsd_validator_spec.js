const helper = require('../spec_helper');
const AppEvents = require('../../src/AppEvents');
const XSDValidator = require('../../src/validate/XSDValidator');

describe("XSD Validation", () => {
  describe("on success", () => {
    it("should return true", (done) => {
      let data = `<ord:order  xmlns:ord="http://example.org/ord"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xsi:schemaLocation="http://example.org/ord">
                    <number>123ABBCC123</number>
                    <customer>
                      <name>Priscilla Walmsley</name>
                      <number>15466</number>
                    </customer>
                    <items>
                      <product>
                        <number>557</number>
                        <name>Short-Sleeved Linen Blouse</name>
                        <size system="US-DRESS">10</size>
                        <color value="blue"/>
                      </product>
                    </items>
                  </ord:order>`

      new XSDValidator({schema: "./test/resources/test.xsd" }, "12345")
        .validate(data)
        .then((validData) => {
          expect(validData).to.equal(data);
          done()
        });
    });

    it("should emit Successful Validation event for the job", (done) => {
      let data = `<ord:order  xmlns:ord="http://example.org/ord"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xsi:schemaLocation="http://example.org/ord">
                    <number>123ABBCC123</number>
                    <customer>
                      <name>Priscilla Walmsley</name>
                      <number>15466</number>
                    </customer>
                    <items>
                      <product>
                        <number>557</number>
                        <name>Short-Sleeved Linen Blouse</name>
                        <size system="US-DRESS">10</size>
                        <color value="blue"/>
                      </product>
                    </items>
                  </ord:order>`
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.XSD_VALIDATION_SUCCESSFUL, eventSpy)

      new XSDValidator({schema: "./test/resources/test.xsd" }, "12345")
        .validate(data)
        .then((isValid) => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done()
        });
    });
  });
  describe("on failure", () => {
    it("should return errors for invalid schema location", (done) => {
      new XSDValidator({schema: "./test/resources/DONT_EXIST.xsd" }, "12345")
        .validate("dontcare")
        .catch((errors) => {
          expect(errors).to.be.an('array');
          done()
        });
    });

    it("should emit Failed Event for invalid schema location", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.XSD_VALIDATION_FAILED, eventSpy)

      new XSDValidator({schema: "./test/resources/DONT_EXIST.xsd" }, "12345")
        .validate("dontcare")
        .catch((errors) => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done()
        });
    });

    it("should return errors for invalid content", (done) => {
      let data = `<ord:order  xmlns:ord="http://example.org/ord"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xsi:schemaLocation="http://example.org/ord">
                    <number>123ABBCC123</number>
                    <customer>
                      <name>Priscilla Walmsley</name>
                      <number>15466</number>
                    </customer>
                    <elements>
                      <product>
                        <number>557</number>
                        <name>Short-Sleeved Linen Blouse</name>
                        <size system="US-DRESS">10</size>
                        <color value="blue"/>
                      </product>
                    </elements>
                  </ord:order>`

      new XSDValidator({schema: "./test/resources/test.xsd" }, "12345")
        .validate(data)
        .catch((errors) => {
          expect(errors).to.be.an('array');
          done()
        });
    });

    it("should emit failed event for invalid content", (done) => {
      let data = `<ord:order  xmlns:ord="http://example.org/ord"
                     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                     xsi:schemaLocation="http://example.org/ord">
                    <number>123ABBCC123</number>
                    <customer>
                      <name>Priscilla Walmsley</name>
                      <number>15466</number>
                    </customer>
                    <elements>
                      <product>
                        <number>557</number>
                        <name>Short-Sleeved Linen Blouse</name>
                        <size system="US-DRESS">10</size>
                        <color value="blue"/>
                      </product>
                    </elements>
                  </ord:order>`
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.XSD_VALIDATION_FAILED, eventSpy)

      new XSDValidator({schema: "./test/resources/test.xsd" }, "12345")
        .validate(data)
        .catch((errors) => {
          expect(eventSpy).to.have.been.calledWith("12345")
          done()
        });
    });
  })
});
