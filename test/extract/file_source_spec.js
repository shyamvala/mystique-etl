const helper = require('../spec_helper');
const FileSource = require('../../src/extract/FileSource');
const AppEvents = require('../../src/AppEvents');
const fs = require('fs');
var path = require('path');

describe('Extract from file', () => {

  describe("on success", () => {
    it("should load file data", (done) => {
      let filePath = path.join(__dirname, '.', 'filesource.xml');
      new FileSource({ file: filePath, name: "testFile" }, "FileJob")
        .fetch()
        .then(data => {
          fs.readFile(filePath, "utf8", (err, expectedData) => {
            if(err) {
              done(err);
              return;
            }
            expect(data).to.equal(expectedData.replace(/\r|\n/g, ''));
            done();
          });
        })
      });

    it("should emit extract successful event for the given job id", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.FILE_EXTRACT_SUCCESSFUL, eventSpy);

      let filePath = path.join(__dirname, '.', 'filesource.xml');
      new FileSource({file: filePath, name: "testFile"}, "FileJob")
        .fetch()
        .then(() => {
          expect(eventSpy).to.have.been.calledWith("FileJob")
          done();
        })
    });
  });

  describe("on failure", () => {
    it("should emit extract failed event for the given job id on failed fetch", (done) => {
      let eventSpy = sinon.spy();
      AppEvents.on(AppEvents.FILE_EXTRACT_FAILED, eventSpy);

      let filePath = path.join(__dirname, '.', 'non-existing-file.xml');
      new FileSource({file: filePath, name: "testFile"}, "FileJob")
        .fetch()
        .catch(() => {
          expect(eventSpy).to.have.been.calledWith("FileJob")
          done();
        })
    });
  })
});
