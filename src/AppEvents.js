const EventEmitter = require('events');
const util = require('util');
const _ = require('lodash');

function AppEventEmitter () {}

util.inherits(AppEventEmitter, EventEmitter);

const appEvents = new AppEventEmitter();

//Extract Events
appEvents.FILE_EXTRACT_REQUESTED = 'file-extract-requested';
appEvents.FILE_EXTRACT_SUCCESSFUL = 'file-extract-successful';
appEvents.FILE_EXTRACT_FAILED = 'file-extract-failed';
appEvents.INPUT_DATA_EXTRACT_REQUESTED = 'input-data-extract-requested';
appEvents.INPUT_DATA_EXTRACT_SUCCESSFUL = 'input-data-extract-successful';
appEvents.HTTP_JSON_EXTRACT_REQUESTED = 'http-json-extract-requested';
appEvents.HTTP_JSON_EXTRACT_SUCCESSFUL = 'http-json-extract-successful';
appEvents.HTTP_JSON_EXTRACT_FAILED = 'http-json-extract-failed';
appEvents.HTTP_XML_EXTRACT_REQUESTED = 'http-xml-extract-requested';
appEvents.HTTP_XML_EXTRACT_SUCCESSFUL = 'http-xml-extract-successful';
appEvents.HTTP_XML_EXTRACT_FAILED = 'http-xml-extract-failed';
appEvents.WEBPAGE_EXTRACT_REQUESTED = 'webpage-extract-requested';
appEvents.WEBPAGE_EXTRACT_SUCCESSFUL = 'webpage-extract-successful';
appEvents.WEBPAGE_EXTRACT_FAILED = 'webpage-extract-failed';

//Transform Events
appEvents.NO_OP_TRANSFORM_REQUESTED = 'no-op-transform-requested';
appEvents.NO_OP_TRANSFORM_SUCCESSFUL = 'no-op-transform-successful';
appEvents.XML2JS_TRANSFORM_REQUESTED = 'xml2js-transform-requested';
appEvents.XML2JS_TRANSFORM_SUCCESSFUL = 'xml2js-transform-successful';
appEvents.XML2JS_TRANSFORM_FAILED = 'xml2js-transform-failed';
appEvents.CUSTOM_TRANSFORM_REQUESTED = 'custom-transform-requested';
appEvents.CUSTOM_TRANSFORM_SUCCESSFUL = 'custom-transform-successful';
appEvents.CUSTOM_TRANSFORM_FAILED = 'custom-transform-failed';
appEvents.CUSTOM_TRANSFORM_REQUESTED = 'custom-transform-requested';
appEvents.CUSTOM_TRANSFORM_SUCCESSFUL = 'custom-transform-successful';
appEvents.CUSTOM_TRANSFORM_FAILED = 'custom-transform-failed';

//Validation Events
appEvents.NO_OP_VALIDATION_REQUESTED = 'no-op-validation-requested';
appEvents.NO_OP_VALIDATION_SUCCESSFUL = 'no-op-validation-successful';
appEvents.XSD_VALIDATION_REQUESTED = 'xsd-validation-requested';
appEvents.XSD_VALIDATION_SUCCESSFUL = 'xsd-validation-successful';
appEvents.XSD_VALIDATION_FAILED = 'xsd-validation-failed';

//Load Events
appEvents.STD_OUT_LOAD_REQUESTED = 'std-out-load-requested';
appEvents.STD_OUT_LOAD_SUCCESSFUL = 'std-out-load-successful';
appEvents.S3_UPLOAD_REQUESTED = 's3-upload-requested';
appEvents.S3_UPLOAD_SUCCESSFUL = 's3-upload-successful';
appEvents.S3_UPLOAD_FAILED = 's3-upload-failed';

const REQUEST_EVENTS = [
  appEvents.INPUT_DATA_EXTRACT_REQUESTED,
  appEvents.HTTP_JSON_EXTRACT_REQUESTED,
  appEvents.HTTP_XML_EXTRACT_REQUESTED,
  appEvents.XML2JS_TRANSFORM_REQUESTED,
  appEvents.CUSTOM_TRANSFORM_REQUESTED,
  appEvents.NO_OP_VALIDATION_REQUESTED,
  appEvents.XSD_VALIDATION_REQUESTED,
  appEvents.STD_OUT_LOAD_REQUESTED,
  appEvents.S3_UPLOAD_REQUESTED,
];

const SUCCESS_EVENTS = [
  appEvents.INPUT_DATA_EXTRACT_SUCCESSFUL,
  appEvents.HTTP_JSON_EXTRACT_SUCCESSFUL,
  appEvents.HTTP_XML_EXTRACT_SUCCESSFUL,
  appEvents.XML2JS_TRANSFORM_SUCCESSFUL,
  appEvents.CUSTOM_TRANSFORM_SUCCESSFUL,
  appEvents.NO_OP_VALIDATION_SUCCESSFUL,
  appEvents.XSD_VALIDATION_SUCCESSFUL,
  appEvents.STD_OUT_LOAD_SUCCESSFUL,
  appEvents.S3_UPLOAD_SUCCESSFUL,
];

const FAILURE_EVENTS = [
  appEvents.HTTP_JSON_EXTRACT_FAILED,
  appEvents.HTTP_XML_EXTRACT_FAILED,
  appEvents.XML2JS_TRANSFORM_FAILED,
  appEvents.CUSTOM_TRANSFORM_FAILED,
  appEvents.XSD_VALIDATION_FAILED,
  appEvents.S3_UPLOAD_FAILED,
];

appEvents.registerEventsToLifeCycleListener = (listener) => {
  let onStartEventListener = (event, data) => {
    listener.onStart(event, data);
  };

  let onSuccessEventListener = (event, data) => {
    listener.onSuccess(event, data);
  };

  let onFailureEventListener = (event, data) => {
    listener.onFail(event, data);
  };
  _.each(REQUEST_EVENTS, (event) => {
      appEvents.on(event, (data) => onStartEventListener(event, data));
  });

  _.each(SUCCESS_EVENTS, (event) => {
      appEvents.on(event, (data) => onSuccessEventListener(event, data));
  });

  _.each(FAILURE_EVENTS, (event) => {
      appEvents.on(event, (data) => onFailureEventListener(event, data));
  });
}

module.exports = appEvents;
