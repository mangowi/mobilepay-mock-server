'use strict';

var utils = require('../utils/writer.js');
var Refunds = require('../service/RefundsService');

module.exports.CancelRefund = function cancelRefund (req, res, next) {
  var refundId = req.swagger.params['refundId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Refunds.cancelRefund(refundId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.CaptureRefund = function captureRefund (req, res, next) {
  var refundId = req.swagger.params['refundId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Refunds.captureRefund(refundId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.CreateRefund = function createRefund (req, res, next) {
  var request = req.swagger.params['request'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var xMobilePayIdempotencyKey = req.swagger.params['X-MobilePay-Idempotency-Key'].value;
  Refunds.createRefund(request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetRefund = function getRefund (req, res, next) {
  var refundId = req.swagger.params['refundId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Refunds.getRefund(refundId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.QueryRefundIds = function queryRefundIds (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var paymentId = req.swagger.params['paymentId'].value;
  Refunds.queryRefundIds(authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,paymentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
