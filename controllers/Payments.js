'use strict';

var utils = require('../utils/writer.js');
var Payments = require('../service/PaymentsService');

module.exports.v10PaymentsPaymentIdCancelPOST = function cancelPayment (req, res, next) {
  var paymentId = req.swagger.params['paymentId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Payments.cancelPayment(paymentId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error(response);
      utils.writeJson(res, response);
    });
};

module.exports.v10PaymentsPaymentIdCapturePOST = function capturePayment (req, res, next) {
  var paymentId = req.swagger.params['paymentId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var body = req.swagger.params['body'].value;
  Payments.capturePayment(paymentId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error(response);
      utils.writeJson(res, response);
    });
};

module.exports.v10PaymentsPOST = function initiateReservationPayment (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var xMobilePayIdempotencyKey = req.swagger.params['X-MobilePay-Idempotency-Key'].value;
  var body = req.swagger.params['body'].value;
  Payments.initiateReservationPayment(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error(response);
      utils.writeJson(res, response);
    });
};

module.exports.v10PaymentsPaymentIdReadyPOST = function paymentReady (req, res, next) {
  var paymentId = req.swagger.params['paymentId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var body = req.swagger.params['body'].value;
  Payments.paymentReady(paymentId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v10PaymentsPreparePOST = function prepareReservationPayment (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var xMobilePayIdempotencyKey = req.swagger.params['X-MobilePay-Idempotency-Key'].value;
  var body = req.swagger.params['body'].value;
  Payments.prepareReservationPayment(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.v10PaymentsPaymentIdGET = function queryPayment (req, res, next) {
  var paymentId = req.swagger.params['paymentId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  Payments.queryPayment(paymentId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      console.error(response);
      utils.writeJson(res, response);
    });
};

module.exports.v10PaymentsGET = function queryPaymentIds (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayMerchantVATNumber = req.swagger.params['X-MobilePay-Merchant-VAT-Number'].value;
  var xIBMClientId = req.swagger.params['X-IBM-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var posId = req.swagger.params['posId'].value;
  var orderId = req.swagger.params['orderId'].value;
  var active = req.swagger.params['active'].value;
  Payments.queryPaymentIds(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,posId,orderId,active)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
