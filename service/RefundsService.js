'use strict';

const uuid = require('uuid/v4');
const utils = require('../utils/writer.js');
const merchantPaymentLabel = require('../utils/MerchantPaymentLabelCodes');
const Payments = require('./PaymentsService');

let refunds = new Map();

/**
 * Cancel a refund
 *
 * refundId UUID Refund id
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * no response value expected for this operation
 **/
exports.cancelRefund = function(refundId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  return new Promise(function(resolve, reject) {
    var refund = refunds.get(refundId);
    var payments = Payments.getPayments();

    if (refund != null && payments.has(refund.paymentId)) {
      var payment = payments.get(refund.paymentId);
      if (payment.merchantPaymentLabel == merchantPaymentLabel.CANCEL_REFUND_EXCEPTION
          || payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_CANCEL_REFUND_EXCEPTION) {
        var payload = {
          "code": "code",
          "message": "error message",
          "correlationId": "correlationId"
        };
        resolve(utils.respondWithCode(500, payload));
      } else {
        resolve();
      }
    } else {
      resolve();
    }
  });
}


/**
 * Capture a refund
 *
 * refundId UUID Refund id
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * no response value expected for this operation
 **/
exports.captureRefund = function(refundId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create a refund (a payment can be refunded multiple times, the sum of the refunds cannot exceed the payment full amount)
 *
 * request CreateRefundRequest
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * xMobilePayIdempotencyKey String Used to ensure retried calls are handled correctly
 * returns CreateRefundResponse
 **/
exports.createRefund = function(request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey) {
  return new Promise(function(resolve, reject) {
    var refundId = uuid();
    var paymentId = request.paymentId;
    refunds.set(refundId, {count: -1, paymentId: paymentId});
    var payments = Payments.getPayments();
    if (payments.has(paymentId) && payments.get(paymentId).merchantPaymentLabel == merchantPaymentLabel.CREATE_REFUND_EXCEPTION) {
      var payload = {
        'code': 'code',
        'message': 'message',
        'correlationId': 'correlationId'
      };
      resolve(utils.respondWithCode(500, payload));
    } else if (payments.has(paymentId) && payments.get(paymentId).merchantPaymentLabel == merchantPaymentLabel.CREATE_REFUND_EXCEPTION_MISMATCH_MERCHANT) {
      var payload = {
        'code': 'code',
        'message': 'message',
        'correlationId': 'correlationId'
      };
      resolve(utils.respondWithCode(403, payload));
    } else {
      var payload = {
        "refundId" : refundId
      };
      resolve(payload);
    }
  });
}


/**
 * Lookup a Refund
 *
 * refundId UUID RefundId
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * returns RefundResponse
 **/
exports.getRefund = function(refundId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  var statuses = ["Initiated", "Reserved", "Captured"];

  if (refunds.has(refundId)) {
    var refund = refunds.get(refundId);
    var count = refund.count;
    if ((refund.count + 1) < statuses.length) {
      refund.count++;
    }
    refunds.set(refundId, refund);
  } else {
    refunds.set(refundId, {count: 0, paymentId: uuid()});
  }

  var refund = refunds.get(refundId);
  var payments = Payments.getPayments();
  if (payments.has(refund.paymentId)) {
    var payment = payments.get(refund.paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_REFUND_EXCEPTION
        || payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_CANCEL_REFUND_EXCEPTION) {
      return getRefundException('code', 'message', 'correlationId');
    } else {
      return getRefundInternal(refundId, refund, statuses);
    }
  } else {
    return getRefundInternal(refundId, refund, statuses);
  }
}

let getRefundException = function(code, message, correlationId) {
  return new Promise(function(resolve, reject) {
    var payload = {
      'code': code,
      'message': message,
      'correlationId': correlationId
    };
    resolve(utils.respondWithCode(500, payload));
  });
}

let getRefundInternal = function(refundId, refund, statuses) {
  return new Promise(function(resolve, reject) {
    var payload = {
      "refundId" : refundId,
      "paymentId" : refund.paymentId,
      "refundOrderId" : "REFUND-12345",
      "amount" : 12.5,
      "currencyCode" : "DKK",
      "status" : statuses[refunds.get(refundId).count % statuses.length],
      "pollDelayInMs" : 100
    };
    resolve(payload);
  });
}


/**
 * Lookup Refunds for a given filter
 *
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * paymentId UUID Restricts Refunds returned to those that belongs to this paymentId (optional)
 * returns QueryRefundIdsResponse
 **/
exports.queryRefundIds = function(authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,paymentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "refundIds" : [ "6aee222f-703c-47f0-92ab-bc1c366b7d52" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
