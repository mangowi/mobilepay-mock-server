'use strict';

var utils = require('../utils/writer.js');
var Payments = require('../service/PaymentsService');

module.exports.CancelPayment = function cancelPayment (req, res, next) {
  var paymentId = req.swagger.params['paymentId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Payments.cancelPayment(paymentId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      if (paymentId == "00000000-0000-0000-0000-000000000000") {
        response = utils.respondWithCode(500, response);
      }
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.CapturePayment = function capturePayment (req, res, next) {
  var paymentId = req.swagger.params['paymentId'].value;
  var request = req.swagger.params['request'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Payments.capturePayment(paymentId,request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.InitiateReservationPayment = function initiateReservationPayment (req, res, next) {
  var request = req.swagger.params['request'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var xMobilePayIdempotencyKey = req.swagger.params['X-MobilePay-Idempotency-Key'].value;
  Payments.initiateReservationPayment(request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.PaymentReady = function paymentReady (req, res, next) {
  var paymentId = req.swagger.params['paymentId'].value;
  var request = req.swagger.params['request'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Payments.paymentReady(paymentId,request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.PrepareReservationPayment = function prepareReservationPayment (req, res, next) {
  var request = req.swagger.params['request'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var xMobilePayIdempotencyKey = req.swagger.params['X-MobilePay-Idempotency-Key'].value;
  Payments.prepareReservationPayment(request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.QueryPayment = function queryPayment (req, res, next) {
  var paymentId = req.swagger.params['paymentId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Payments.queryPayment(paymentId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.QueryPaymentIds = function queryPaymentIds (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var posId = req.swagger.params['posId'].value;
  var orderId = req.swagger.params['orderId'].value;
  var active = req.swagger.params['active'].value;
  Payments.queryPaymentIds(authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,posId,orderId,active)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
