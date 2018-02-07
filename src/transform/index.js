const XML2JSTransformer = require('./XML2JSTransformer');
const CustomTransformer = require('./CustomTransformer');
const NoOpTransformer = require('./NoOpTransformer');

module.exports = {
  xml2js: XML2JSTransformer,
  custom: CustomTransformer,
  no_op: NoOpTransformer
}
