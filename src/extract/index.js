const HTTPJSONSource = require('./HTTPJSONSource');
const HTTPXMLSource = require('./HTTPXMLSource');
const InputDataSource = require('./InputDataSource');

module.exports = {
  http_json: HTTPJSONSource,
  http_xml: HTTPXMLSource,
  input_data: InputDataSource
};
