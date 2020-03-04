'use strict';

const uuid = require('uuid/v4');
const utils = require('../utils/writer.js');
const merchantPaymentLabel = require('../utils/MerchantPaymentLabelCodes');
const Payments = require('./PaymentsService');
const statuses = require('../utils/MobilePayStatuses.js');

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
  var payments = Payments.getPayments();
  if (refunds.has(refundId)) {
    var refund = refunds.get(refundId);
    var payment = payments.get(refund.paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.CANCEL_REFUND_EXCEPTION
        || payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_CANCEL_REFUND_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (refund.status == statuses.CAPTURED) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else {
      refund.status = statuses.CANCELLEDBYCLIENT;
      return cancelRefundInternal();
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
}

let cancelRefundInternal = function() {
  return new Promise(function(resolve, reject) {
    resolve();
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
  if (refunds.has(refundId)) {
    var refund = refunds.get(refundId);
    if (refund.status == statuses.RESERVED) {
      refund.status = statuses.CAPTURED;
      return captureRefundInternal();
    } else {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
}

let captureRefundInternal = function() {
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
  var payments = Payments.getPayments();
  var refundId = uuid();
  var paymentId = request.paymentId;
  if (payments.has(paymentId)) {
    var payment = payments.get(paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.CREATE_REFUND_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (payment.merchantPaymentLabel == merchantPaymentLabel.CREATE_REFUND_EXCEPTION_MISMATCH_MERCHANT) {
      return prepareErrorResponse(403, 'code', 'message', 'correlationId');
    } else if (payment.status != statuses.CAPTURED) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else {
      refunds.set(
        refundId,
        {
          id: refundId,
          paymentId: paymentId,
          status: null
        }
      );
      return createRefundInternal(refundId);
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
}

let createRefundInternal = function(refundId) {
  return new Promise(function(resolve, reject) {
    var payload = {
      "refundId" : refundId
    };
    resolve(payload);
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
  var payments = Payments.getPayments();
  if (refunds.has(refundId)) {
    var refund = refunds.get(refundId);
    var payment = payments.get(refund.paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_REFUND_EXCEPTION
        || payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_CANCEL_REFUND_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (refund.status == null) {
      refund.status = statuses.INITIATED;
      return getRefundInternal(refund);
    } else if (refund.status == statuses.INITIATED) {
      refund.status = statuses.RESERVED;
      return getRefundInternal(refund);
    } else {
      return getRefundInternal(refund);
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
}

let prepareErrorResponse = function(httpCode, code, message, correlationId) {
  return new Promise(function(resolve, reject) {
    var payload = {
      'code': code,
      'message': message,
      'correlationId': correlationId
    };
    resolve(utils.respondWithCode(httpCode, payload));
  });
}

let getRefundInternal = function(refund) {
  return new Promise(function(resolve, reject) {
    var payload = {
      "refundId" : refund.id,
      "paymentId" : refund.paymentId,
      "refundOrderId" : "REFUND-12345",
      "amount" : 12.5,
      "currencyCode" : "DKK",
      "status" : refund.status,
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
