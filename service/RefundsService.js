'use strict';


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
    var examples = {};
    examples['application/json'] = {
  "refundId" : "6aee222f-703c-47f0-92ab-bc1c366b7d52"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "refundId" : "6aee222f-703c-47f0-92ab-bc1c366b7d52",
  "paymentId" : "1cbfff94-3d17-4dc1-b667-5280e1ce50f9",
  "refundOrderId" : "REFUND-12345",
  "amount" : 12.5,
  "currencyCode" : "DKK",
  "status" : "Reserved",
  "pollDelayInMs" : 100
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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

