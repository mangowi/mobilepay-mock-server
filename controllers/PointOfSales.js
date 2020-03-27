'use strict';

var utils = require('../utils/writer.js');
var PointOfSales = require('../service/PointOfSalesService');

module.exports.v10PointofsalesPOST = function createPos (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var xMobilePayIdempotencyKey = req.swagger.params['X-MobilePay-Idempotency-Key'].value;
  var body = req.swagger.params['body'].value;
  PointOfSales.createPos(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v10PointofsalesPosIdDELETE = function deletePos (req, res, next) {
  var posId = req.swagger.params['posId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  PointOfSales.deletePos(posId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v10PointofsalesPosIdCheckinGET = function getCheckIn (req, res, next) {
  var posId = req.swagger.params['posId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  PointOfSales.getCheckIn(posId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v10PointofsalesPosIdGET = function getPos (req, res, next) {
  var posId = req.swagger.params['posId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  PointOfSales.getPos(posId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v10PointofsalesGET = function getPosWithFilter (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var storeId = req.swagger.params['storeId'].value;
  var beaconId = req.swagger.params['beaconId'].value;
  var merchantPosId = req.swagger.params['merchantPosId'].value;
  PointOfSales.getPosWithFilter(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,storeId,beaconId,merchantPosId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
