'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/TokenService');

module.exports._well_knownOpenid_configurationGET = function _well_knownOpenid_configurationGET (req, res, next) {
  Default._well_knownOpenid_configurationGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports._well_knownOpenid_configurationJwksGET = function _well_knownOpenid_configurationJwksGET (req, res, next) {
  Default._well_knownOpenid_configurationJwksGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.connectTokenPOST = function connectTokenPOST (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var contentType = req.swagger.params['Content-Type'].value;
  var grant_type = req.swagger.params['grant_type'].value;
  var merchant_vat = req.swagger.params['merchant_vat'].value;
  Default.connectTokenPOST(authorization,contentType,grant_type,merchant_vat)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
