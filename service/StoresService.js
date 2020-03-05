'use strict';


/**
 * Lookup a store
 *
 * storeId UUID Store identifier
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * returns StoreResponse
 **/
exports.getStore = function(storeId,authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "storeName" : "Store 1",
  "storeId" : "268edad7-ba00-442e-b5c2-0c9b58e80771",
  "storeStreet" : "Example City",
  "storeZipCode" : "1234",
  "storeCity" : "Example City",
  "brandName" : "The Brand",
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
 * Lookup stores for a given filter
 *
 * authorization String Integrator's bearer token
 * xMobilePayMerchantVATNumber String Merchant VAT identification number
 * xIBMClientId UUID Integrator's MobilePay client id
 * xMobilePayClientSystemName String Integrator's certified system name
 * xMobilePayClientSystemVersion String Integrator's certified system version
 * merchantBrandId String Merchant brand identifier (optional)
 * merchantLocationId String Merchant location identifier (optional)
 * returns StoreIdsResponse
 **/
exports.getStores = function(authorization,xMobilePayMerchantVATNumber,xIBMClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,merchantBrandId,merchantLocationId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "storeIds" : [ "268edad7-ba00-442e-b5c2-0c9b58e80771" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}
