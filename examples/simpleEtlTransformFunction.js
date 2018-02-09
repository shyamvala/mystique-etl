module.exports = function(data, successCb, errorCb) {
  return successCb(data["input"].split(" ").join("::"))
}
