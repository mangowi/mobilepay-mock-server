'use strict';

var utils = require('../utils/writer.js');
var Stores = require('../service/StoresService');

module.exports.GetStore = function getStore (req, res, next) {
  var storeId = req.swagger.params['storeId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Stores.getStore(storeId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetStores = function getStores (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var merchantBrandId = req.swagger.params['merchantBrandId'].value;
  var merchantLocationId = req.swagger.params['merchantLocationId'].value;
  Stores.getStores(authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,merchantBrandId,merchantLocationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
