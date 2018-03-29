const logger = require('debug');
const _ = require('lodash');
const AppEvents = require('../AppEvents');
const AWS = require('aws-sdk');

class S3Uploader {

  constructor(config, jobId) {
    this.bucketName = config.bucketName;
    this.fileName = config.fileName;
    this.awsConfig = config.awsConfig || {};
    this.options = config.options || {};
    this.jobId = jobId;
    this.logger = logger(`app:load:s3:job:${jobId}`);
  }

  load(data) {
    let s3 = new AWS.S3(this.awsConfig);
    this.logger(`Request to Upload data to File ${this.fileName} in S3 Bucket ${this.bucketName}`)
    AppEvents.emit(AppEvents.S3_UPLOAD_REQUESTED, this.jobId);
    return new Promise((resolve, reject) => {
      let success = (data) => {
        this.logger(`Upload data Succeeded to File ${this.fileName} in S3 Bucket ${this.bucketName}`)
        AppEvents.emit(AppEvents.S3_UPLOAD_SUCCESSFUL, this.jobId);
        resolve(data);
      };

      let failed = (err) => {
        this.logger(`Upload data Failed to File ${this.fileName} in S3 Bucket ${this.bucketName}`)
        AppEvents.emit(AppEvents.S3_UPLOAD_FAILED, this.jobId);
        reject(err);
      };

      let objectData = _.extend({}, this.options, { Bucket: this.bucketName, Key: this.fileName, Body: data });
      s3.putObject(objectData, (err, responseData) => {
        err ? failed(err) : success(data);
      });
    });
  }

  get [Symbol.toStringTag]() {
    return 'S3Uploader';
  }
}

module.exports = S3Uploader;
