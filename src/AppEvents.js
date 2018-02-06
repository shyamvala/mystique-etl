const EventEmitter = require('events');
const util = require('util');

function AppEventEmitter () {}

util.inherits(AppEventEmitter, EventEmitter);

const appEvents = new AppEventEmitter();

appEvents.HTTP_JSON_EXTRACT_REQUESTED = 'http-json-extract-requested';
appEvents.HTTP_JSON_EXTRACT_SUCCESSFUL = 'http-json-extract-successful';
appEvents.HTTP_JSON_EXTRACT_FAILED = 'http-json-extract-failed';

appEvents.CUSTOM_TRANSFORM_REQUESTED = 'custom-transform-requested';
appEvents.CUSTOM_TRANSFORM_SUCCESSFUL = 'custom-transform-successful';
appEvents.CUSTOM_TRANSFORM_FAILED = 'custom-transform-failed';

appEvents.XSD_VALIDATION_REQUESTED = 'xsd-validation-requested';
appEvents.XSD_VALIDATION_SUCCESSFUL = 'xsd-validation-successful';
appEvents.XSD_VALIDATION_FAILED = 'xsd-validation-failed';

appEvents.S3_UPLOAD_REQUESTED = 's3-upload-requested';
appEvents.S3_UPLOAD_SUCCESSFUL = 's3-upload-successful';
appEvents.S3_UPLOAD_FAILED = 's3-upload-failed';
module.exports = appEvents;
