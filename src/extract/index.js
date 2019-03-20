const HTTPJSONSource = require('./HTTPJSONSource');
const HTTPXMLSource = require('./HTTPXMLSource');
const FileSource = require('./FileSource');
const InputDataSource = require('./InputDataSource');
const WebpageSource = require('./WebpageSource');

module.exports = {
  http_json: HTTPJSONSource,
  http_xml: HTTPXMLSource,
  file: FileSource,
  input_data: InputDataSource,
  webpage: WebpageSource
};
