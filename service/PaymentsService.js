'use strict';


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
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "paymentId" : "1cbfff94-3d17-4dc1-b667-5280e1ce50f9",
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
  "status" : "Paired",
  "customerToken" : "41e519d3b5ac1a228bd15fab8958f1d9b4ee28eb",
  "customerReceiptToken" : "671c4da4859a4639a5453120d791aac0",
  "loyaltyIds" : [ "123456" ],
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

