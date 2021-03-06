'use strict';

const uuid = require('uuid/v4');
const utils = require('../utils/writer.js');
const merchantPaymentLabel = require('../utils/MerchantPaymentLabelCodes');
const statuses = require('../utils/MobilePayStatuses.js');

let payments = new Map();
let pointsOfSales = new Map();

exports.getPointsOfSales = function() {
  return pointsOfSales;
};

exports.getPayments = function() {
  return payments;
};
/**
 * Cancel a payment. A payment cannot be cancelled once it has been captured.
 *
 * paymentId UUID Payment identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * no response value expected for this operation
 **/
exports.cancelPayment = function(paymentId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  if (payments.has(paymentId)) {
    var payment = payments.get(paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.CANCEL_PAYMENT_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (payment.merchantPaymentLabel === merchantPaymentLabel.CANCEL_ACTIVE_PAYMENT_EXCEPTION) {
      payment.merchantPaymentLabel = null;
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
};

let cancelPaymentInternal = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};

/**
 * Capture a payment. Only reserved payments can be captured.
 *
 * paymentId UUID Payment identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * body PaymentCaptureRequest Capture payment request
 * no response value expected for this operation
 **/
exports.capturePayment = function(paymentId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,body) {
  if (payments.has(paymentId)) {
    var payment = payments.get(paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.CAPTURE_PAYMENT_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (payment.status == statuses.RESERVED) {
      payment.status = statuses.CAPTURED;
      return capturePaymentInternal();
    } else {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    }
  } else {
    return prepareErrorResponse(404, 'code', 'message', 'correlationId');
  }
};

let capturePaymentInternal = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Initiate a new payment
 *
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * xMobilePayIdempotencyKey String Used to ensure retried calls are handled correctly
 * body InitiatePaymentRequest Initiate payment request
 * returns PaymentInitiatedResponse
 **/
exports.initiateReservationPayment = function (authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey,body) {
  if (body.merchantPaymentLabel === merchantPaymentLabel.INITIATE_PAYMENT_EXCEPTION) {
    return prepareErrorResponse(500, 'code', 'message', 'correlationId');
  } else if (body.merchantPaymentLabel === merchantPaymentLabel.INITIATE_PAYMENT_EXCEPTION_ALREADY_INITIATED) {
    return prepareErrorResponse(409, '1301', 'message', 'correlationId');
  } else {
    return prepareInitiationResponse(body);
  }
};

let prepareInitiationResponse = function(body) {
  return new Promise(function (resolve) {
    var paymentId = uuid();
    payments.set(
        paymentId,
        {
          id: paymentId,
          posId: body.posId,
          orderId: body.orderId,
          amount: body.amount,
          currencyCode: body.currencyCode,
          merchantPaymentLabel: body.merchantPaymentLabel,
          status: null
        }
    );
    if (body.merchantPaymentLabel === merchantPaymentLabel.INITIATE_PAYMENT_WITH_POS_RELATION ||
          body.merchantPaymentLabel === merchantPaymentLabel.LOOKUP_ACTIVE_PAYMENT_EXCEPTION ||
          body.merchantPaymentLabel === merchantPaymentLabel.QUERY_PAYMENT_IDS_EXCEPTION ||
          body.merchantPaymentLabel === merchantPaymentLabel.CANCEL_ACTIVE_PAYMENT_EXCEPTION) {
        pointsOfSales.set(body.posId, paymentId);
    }
    var payload = {
      "paymentId": paymentId
    };
    resolve(payload);
  });
};


/**
 * Mark payment as ready for approval by user
 *
 * paymentId UUID Payment identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * body PaymentReadyRequest Ready payment request
 * no response value expected for this operation
 **/
exports.paymentReady = function(paymentId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Prepare a new payment that is not yet ready for user approval
 *
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * xMobilePayIdempotencyKey String Used to ensure retried calls are handled correctly
 * body PreparePaymentRequest Prepare payment request
 * returns PaymentInitiatedResponse
 **/
exports.prepareReservationPayment = function(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "paymentId" : "8df4b807-640b-47ea-8969-c49069420116"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};


/**
 * Lookup a payment
 *
 * paymentId UUID Payment identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * returns QueryPaymentResponse
 **/
exports.queryPayment = function(paymentId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  if (payments.has(paymentId)) {
    var payment = payments.get(paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.LOOKUP_PAYMENT_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (payment.merchantPaymentLabel === merchantPaymentLabel.LOOKUP_ACTIVE_PAYMENT_EXCEPTION) {
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    } else if (payment.status == null) {
      payment.status = statuses.INITIATED;
      return queryPaymentInternal(payment);
    } else if (payment.status == statuses.INITIATED && payment.merchantPaymentLabel == merchantPaymentLabel.PAYMENT_CANCELLED_BY_MOBILEPAY_STATUS) {
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
};

let queryPaymentInternal = function(payment) {
  return new Promise(function(resolve, reject) {
    var payload = {
      "paymentId" : payment.id,
      "posId" : payment.posId,
      "orderId" : payment.orderId,
      "amount" : payment.amount,
      "currencyCode" : payment.currencyCode,
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
    if (payment.status == statuses.RESERVED && payment.merchantPaymentLabel == merchantPaymentLabel.PAYMENT_EXPIRED_AND_CANCELLED_STATUS) {
      payment.status = statuses.EXPIREDANDCANCELLED;
    }
  });
};

let prepareErrorResponse = function(httpCode, code, message, correlationId) {
  return new Promise(function (resolve) {
    var payload = {
      'code': code,
      'message': message,
      'correlationId': correlationId
    };
    resolve(utils.respondWithCode(httpCode, payload));
  });
};


/**
 * Lookup payments for a given filter
 *
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * posId UUID Restricts payments returned to those with a specific posId (optional)
 * orderId String Restricts payments returned to those with a specific orderId (optional)
 * active Boolean Restricts payments returned to those that are active (optional)
 * returns QueryPaymentIdsResponse
 **/
exports.queryPaymentIds = function(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,posId,orderId,active) {
  if (pointsOfSales.has(posId)) {
    let paymentId = pointsOfSales.get(posId);
    var payment = payments.get(paymentId);
    if (payment.merchantPaymentLabel == merchantPaymentLabel.QUERY_PAYMENT_IDS_EXCEPTION) {
      payment.merchantPaymentLabel = null;
      return prepareErrorResponse(500, 'code', 'message', 'correlationId');
    }
    return new Promise(function(resolve, reject) {
      let response = {
        "paymentIds" : [ paymentId ]
      };
      resolve(response);
    });
  } else {
    return new Promise(function(resolve, reject) {
      let response = {
        "paymentIds" : [ ]
      };
      resolve(response);
    });
  }
};
