'use strict';


/**
 * Lookup a Store
 *
 * storeId UUID StoreId
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * returns StoreResponse
 **/
exports.getStore = function(storeId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "storeName" : "Store 1",
  "storeId" : "939f2b0d-152e-4000-8e04-2e30aa9faf7f",
  "merchantBrandId" : "POSDK12345",
  "merchantLocationId" : "10001"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Lookup Stores for a given filter
 *
 * authorization String Integrator's Bearer Token
 * xMobilePayClientId UUID Integrator's MobilePay Client Id (Must be a valid GUID)
 * xMobilePayClientSystemName String Integrator's Certified System Name
 * xMobilePayClientSystemVersion String Integrator's Certified System Version
 * merchantBrandId String MerchantBrandId (optional)
 * merchantLocationId String MerchantLocationId (optional)
 * returns StoreIdsResponse
 **/
exports.getStores = function(authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,merchantBrandId,merchantLocationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "storeIds" : [ "939f2b0d-152e-4000-8e04-2e30aa9faf7f" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

