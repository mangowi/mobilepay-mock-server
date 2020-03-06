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
 * refundId UUID Refund identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * no response value expected for this operation
 **/
exports.cancelRefund = function(refundId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  var payments = Payments.getPayments();
  if (refunds.has(refundId)) {
    var refund = refunds.get(refundId);
    var payment = payments.get(refund.paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.CANCEL_REFUND_EXCEPTION ||
        payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_CANCEL_REFUND_EXCEPTION) {
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
};

let cancelRefundInternal = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Capture a refund
 *
 * refundId UUID Refund identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * no response value expected for this operation
 **/
exports.captureRefund = function(refundId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  if (refunds.has(refundId)) {
    var refund = refunds.get(refundId);
    if (refund.merchantPaymentLabel == merchantPaymentLabel.CAPTURE_REFUND_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (refund.status == statuses.RESERVED) {
      refund.status = statuses.CAPTURED;
      return captureRefundInternal();
    } else {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
};

let captureRefundInternal = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Create a refund (a payment can be refunded multiple times, the sum of the refunds cannot exceed the full amount of the payment)
 *
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * xMobilePayIdempotencyKey String Used to ensure retried calls are handled correctly
 * body CreateRefundRequest Create refund request
 * returns CreateRefundResponse
 **/
exports.createRefund = function(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey,body) {
  var payments = Payments.getPayments();
  var refundId = uuid();
  var paymentId = body.paymentId;
  if (payments.has(paymentId)) {
    var payment = payments.get(paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.CREATE_REFUND_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (payment.merchantPaymentLabel == merchantPaymentLabel.CREATE_REFUND_EXCEPTION_MISMATCH_MERCHANT) {
      return prepareErrorResponse(403, '1401', 'Refund created by different integrator', 'correlationId');
    } else if (payment.merchantPaymentLabel == merchantPaymentLabel.CREATE_REFUND_EXCEPTION_PERIOD_EXPIRED) {
      return prepareErrorResponse(409, '1353', 'period of refund has expired', 'correlationId');
    } else if (payment.merchantPaymentLabel == merchantPaymentLabel.CREATE_REFUND_EXCEPTION_MISMATCH_AMOUNT) {
      return prepareErrorResponse(409, '1350', 'amount mismatch', 'correlationId');
    } else if (payment.status != statuses.CAPTURED) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else {
      refunds.set(
        refundId,
        {
          id: refundId,
          paymentId: paymentId,
          refundOrderId: body.refundOrderId,
          amount: body.amount,
          currencyCode: body.currencyCode,
          status: null
        }
      );
      return createRefundInternal(refundId);
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
};

let createRefundInternal = function(refundId) {
  return new Promise(function(resolve, reject) {
    var payload = {
      "refundId" : refundId
    };
    resolve(payload);
  });
};


/**
 * Lookup a refund
 *
 * refundId UUID Refund identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * returns RefundResponse
 **/
exports.getRefund = function(refundId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  var payments = Payments.getPayments();
  if (refunds.has(refundId)) {
    var refund = refunds.get(refundId);
    var payment = payments.get(refund.paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_REFUND_EXCEPTION ||
        payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_CANCEL_REFUND_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (refund.status == null) {
      refund.status = statuses.INITIATED;
      return getRefundInternal(refund, payment);
    } else if (refund.status == statuses.INITIATED) {
      refund.status = statuses.RESERVED;
      return getRefundInternal(refund, payment);
    } else {
      return getRefundInternal(refund, payment);
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
};

let prepareErrorResponse = function(httpCode, code, message, correlationId) {
  return new Promise(function(resolve, reject) {
    var payload = {
      'code': code,
      'message': message,
      'correlationId': correlationId
    };
    resolve(utils.respondWithCode(httpCode, payload));
  });
};

let getRefundInternal = function(refund, payment) {
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
    if (refund.status == statuses.RESERVED && payment.merchantPaymentLabel == merchantPaymentLabel.REFUND_EXPIRED_AND_CANCELLED_STATUS) {
      refund.status = statuses.EXPIREDANDCANCELLED;
    }
  });
};


/**
 * Lookup refunds for a given filter
 *
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * paymentId UUID Restricts refunds returned to those that belongs to this paymentId (optional)
 * returns QueryRefundIdsResponse
 **/
exports.queryRefundIds = function(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,paymentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "refundIds" : [ "02372e2a-0db3-4be3-8a0c-dd957dc52955" ]
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
