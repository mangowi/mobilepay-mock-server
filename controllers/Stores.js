'use strict';

var utils = require('../utils/writer.js');
var Stores = require('../service/StoresService');

module.exports.apiV10StoresStoreIdGET = function getStore (req, res, next) {
  var storeId = req.swagger.params['storeId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Stores.getStore(storeId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiV10StoresGET = function getStores (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var merchantBrandId = req.swagger.params['merchantBrandId'].value;
  var merchantLocationId = req.swagger.params['merchantLocationId'].value;
  Stores.getStores(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,merchantBrandId,merchantLocationId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
