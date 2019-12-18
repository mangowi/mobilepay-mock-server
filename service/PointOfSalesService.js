'use strict';


/**
 * Create a Point of Sale
 *
 * request CreatePosRequest 
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * xMobilePayIdempotencyKey String Used to ensure retried calls are handled correctly
 * returns CreatePosResponse
 **/
exports.createPos = function(request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "posId" : "c0000a0f-68b8-4759-847b-08d5284c344c"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a Point of Sale
 *
 * posId UUID PosId
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * no response value expected for this operation
 **/
exports.deletePos = function(posId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Lookup the current MobilePay User information checked-in at a Point of Sale
 *
 * posId UUID PosId
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * returns GetCheckInResponse
 **/
exports.getCheckIn = function(posId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
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
}


/**
 * Lookup a Point of Sale
 *
 * posId UUID PosId
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * returns PosResponse
 **/
exports.getPos = function(posId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "posId" : "bc2a3687-539a-44d2-9e92-0d746dc90089",
  "merchantPosId" : "My-Pos-1",
  "storeId" : "939f2b0d-152e-4000-8e04-2e30aa9faf7f",
  "name" : "Register 1",
  "beaconId" : "123456789123456",
  "callback" : {
    "destination" : "https://example.com",
    "type" : "Url"
  },
  "supportedBeaconTypes" : [ "QR", "BluetoothMP2" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Lookup Point of Sales for a given filter
 *
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * storeId UUID Restricts Point of Sales returned to those that belong to this Store (optional)
 * beaconId String Restricts Point of Sales returned to the one with this beaconId (optional)
 * merchantPosId String Restricts Point of Sales returned to the one with this merchant PoS identifer (optional)
 * active Boolean Restricts Point of Sales returned to those that are active (i.e., not deleted) (optional)
 * returns PosIdsResponse
 **/
exports.getPosWithFilter = function(authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,storeId,beaconId,merchantPosId,active) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "posIds" : [ "c0000a0f-68b8-4759-847b-08d5284c344c" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

