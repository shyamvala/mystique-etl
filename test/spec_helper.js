var chai = require('chai');
var path = require('path');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

exports.basePath = path.join(__dirname, '..');

global.expect = chai.expect;
global.sinon = sinon;
