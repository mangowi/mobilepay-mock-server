'use strict';

var utils = require('../utils/writer.js');
var Refunds = require('../service/RefundsService');

module.exports.apiV10RefundsRefundIdCancelPOST = function cancelRefund (req, res, next) {
  var refundId = req.swagger.params['refundId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Refunds.cancelRefund(refundId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error(response);
      utils.writeJson(res, response);
    });
};

module.exports.apiV10RefundsRefundIdCapturePOST = function captureRefund (req, res, next) {
  var refundId = req.swagger.params['refundId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Refunds.captureRefund(refundId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error(response);
      utils.writeJson(res, response);
    });
};

module.exports.apiV10RefundsPOST = function createRefund (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var xMobilePayIdempotencyKey = req.swagger.params['X-MobilePay-Idempotency-Key'].value;
  var body = req.swagger.params['body'].value;
  Refunds.createRefund(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error(response);
      utils.writeJson(res, response);
    });
};

module.exports.apiV10RefundsRefundIdGET = function getRefund (req, res, next) {
  var refundId = req.swagger.params['refundId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Refunds.getRefund(refundId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error(response);
      utils.writeJson(res, response);
    });
};

module.exports.apiV10RefundsGET = function queryRefundIds (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var paymentId = req.swagger.params['paymentId'].value;
  Refunds.queryRefundIds(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,paymentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
