'use strict';

const uuid = require('uuid/v4');
const utils = require('../utils/writer.js');
const merchantPaymentLabel = require('../utils/MerchantPaymentLabelCodes');
const statuses = require('../utils/MobilePayStatuses.js');

let payments = new Map();

exports.getPayments = function() {
  return payments;
}
/**
 * Cancel a payment. A payment cannot be cancelled once it has been captured.
 *
 * paymentId UUID PaymentId
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * no response value expected for this operation
 **/
exports.cancelPayment = function(paymentId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  if (payments.has(paymentId)) {
    var payment = payments.get(paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.CANCEL_PAYMENT_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (payment.status == statuses.CAPTURED) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else {
      payment.status = statuses.CANCELLEDBYCLIENT;
      return cancelPaymentInternal();
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
}

let cancelPaymentInternal = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

/**
 * Capture a Payment. Only reserved payments can be captured.
 *
 * paymentId UUID PaymentId
 * request PaymentCaptureRequest
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * no response value expected for this operation
 **/
exports.capturePayment = function(paymentId,request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  if (payments.has(paymentId)) {
    var payment = payments.get(paymentId);
    if (payment.status == statuses.RESERVED) {
      payment.status = statuses.CAPTURED;
      return capturePaymentInternal();
    } else {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
}

let capturePaymentInternal = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Initiate a new Payment
 *
 * request InitiateReservationPaymentRequest
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * xMobilePayIdempotencyKey String Used to ensure retried calls are handled correctly
 * returns PaymentInitiatedResponse
 **/
exports.initiateReservationPayment = function(request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey) {
  return new Promise(function(resolve, reject) {
    if (request.merchantPaymentLabel == merchantPaymentLabel.INITIATE_PAYMENT_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId')
    } else if (request.merchantPaymentLabel == merchantPaymentLabel.INITIATE_PAYMENT_EXCEPTION_ALREADY_INITIATED) {
      return prepareErrorResponse(409, '1301', 'message', 'correlationId')
    } else {
      var paymentId = uuid();
      payments.set(
        paymentId,
        {
          id: paymentId,
          merchantPaymentLabel: request.merchantPaymentLabel,
          status: null
        }
      );

      var payload = {
        "paymentId": paymentId
      };
      resolve(payload);
    }
  });
}


/**
 * Mark Payment as ready for approval by User
 *
 * paymentId UUID paymentId
 * request PaymentReadyRequest
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * no response value expected for this operation
 **/
exports.paymentReady = function(paymentId,request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Prepare a new Payment that is not yet ready for User approval
 *
 * request PrepareReservationPaymentRequest
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * xMobilePayIdempotencyKey String Used to ensure retried calls are handled correctly
 * returns PaymentInitiatedResponse
 **/
exports.prepareReservationPayment = function(request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "paymentId" : "1cbfff94-3d17-4dc1-b667-5280e1ce50f9"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Lookup a Payment
 *
 * paymentId UUID PaymentId
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * returns QueryPaymentResponse
 **/
exports.queryPayment = function(paymentId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  if (payments.has(paymentId)) {
    var payment = payments.get(paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_PAYMENT_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (payment.status == null) {
      payment.status = statuses.INITIATED;
      return queryPaymentInternal(payment);
    } else if (payment.status == statuses.INITIATED && payment.merchantPaymentLabel == merchantPaymentLabel.CANCELLED_BY_MOBILEPAY_STATUS) {
      payment.status = statuses.CANCELLEDBYMOBILEPAY;
      return queryPaymentInternal(payment);
    } else if (payment.status == statuses.INITIATED) {
      payment.status = statuses.ISSUEDTOUSER;
      return queryPaymentInternal(payment);
    } else if (payment.status == statuses.ISSUEDTOUSER && payment.merchantPaymentLabel == merchantPaymentLabel.CANCELLED_BY_USER_STATUS) {
      payment.status = statuses.CANCELLEDBYUSER;
      return queryPaymentInternal(payment);
    } else if (payment.status == statuses.ISSUEDTOUSER) {
      payment.status = statuses.RESERVED;
      return queryPaymentInternal(payment);
    } else {
      return queryPaymentInternal(payment);
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
}

let queryPaymentInternal = function(payment) {
  return new Promise(function(resolve, reject) {
    var payload = {
      "paymentId" : payment.id,
      "posId" : "c0000a0f-68b8-4759-847b-08d5284c344c",
      "orderId" : "ORDER-12345",
      "amount" : 12.5,
      "currencyCode" : "DKK",
      "restrictions" : {
        "debitCardDisallowed" : false,
        "creditCardDisallowed" : false,
        "userMinimumAge" : 18
      },
      "merchantPaymentLabel" : "PaymentLabel",
      "plannedCaptureDelay" : "None",
      "status" : payment.status,
      "customerToken" : "41e519d3b5ac1a228bd15fab8958f1d9b4ee28eb",
      "customerReceiptToken" : "671c4da4859a4639a5453120d791aac0",
      "loyaltyIds" : [ "123456" ],
      "pollDelayInMs" : 100
    };
    resolve(payload);
  });
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


/**
 * Lookup Payments for a given filter
 *
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * posId UUID Restricts Payments returned to those with a specific PosId (optional)
 * orderId String Restricts Payments returned to those with a specific orderId (optional)
 * active Boolean Restricts Payments returned to those that are active (optional)
 * returns QueryPaymentIdsResponse
 **/
exports.queryPaymentIds = function(authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,posId,orderId,active) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "paymentIds" : [ "1cbfff94-3d17-4dc1-b667-5280e1ce50f9" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
