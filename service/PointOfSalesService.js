'use strict';


const uuid = require('uuid/v4');
const utils = require('../utils/writer.js');

let pointOfSales = new Map();

exports.getPointsOfSales = function() {
  return pointOfSales;
};

/**
 * Create a point of sale
 *
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * xMobilePayIdempotencyKey String Used to ensure retried calls are handled correctly
 * body CreatePosRequest Create point of sale request
 * returns CreatePosResponse
 **/
exports.createPos = function(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey,body) {
  var posId = uuid();
  pointOfSales.set(
    posId,
    {
      posId : posId,
      merchantPosId : body.merchantPosId,
      storeId : body.storeId,
      name : body.name,
      beaconId : body.beaconId,
      callbackAlias : body.callbackAlias,
      supportedBeaconTypes : body.supportedBeaconTypes
    }
  );
  return new Promise(function(resolve, reject) {
    var payload = {
      "posId": posId
    };
    resolve(payload);
  });
};


/**
 * Delete a point of sale
 *
 * posId UUID Point of sale identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * no response value expected for this operation
 **/
exports.deletePos = function(posId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  if (pointOfSales.has(posId)) {
      pointOfSales.delete(posId);
  }
  return new Promise(function(resolve, reject) {
    resolve();
  });
};


/**
 * Lookup the current MobilePay user information checked-in at a point of sale
 *
 * posId UUID Point of sale identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * returns GetCheckInResponse
 **/
exports.getCheckIn = function(posId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "isUserCheckedIn" : true,
  "loyaltyIds" : [ "123456" ],
  "pollDelayInMs" : 100
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};


/**
 * Lookup a point of sale
 *
 * posId UUID Point of sale identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * returns PosResponse
 **/
exports.getPos = function(posId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  if (pointOfSales.has(posId)) {
      var pos = pointOfSales.get(posId);
      return getPosInternal(pos);
  } else {
    return prepareErrorResponse(404, "code", "message", "correlationId");
  }
};

let getPosInternal = function(pos) {
  return new Promise(function(resolve, reject) {
    resolve(pos);
  });
};


/**
 * Lookup point of sales for a given filter
 *
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * storeId UUID Restricts point of sales returned to those that belong to this store (optional)
 * beaconId String Restricts point of sales returned to the one with this beaconId (optional)
 * merchantPosId String Restricts point of sales returned to the one with this merchantPoSId (optional)
 * returns PosIdsResponse
 **/
exports.getPosWithFilter = function(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,storeId,beaconId,merchantPosId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "posIds" : [ "4cc3e55a-1dfc-4d0b-8d29-588bee056104" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
