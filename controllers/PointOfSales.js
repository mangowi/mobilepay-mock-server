'use strict';

var utils = require('../utils/writer.js');
var PointOfSales = require('../service/PointOfSalesService');

module.exports.CreatePos = function createPos (req, res, next) {
  var request = req.swagger.params['request'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var xMobilePayIdempotencyKey = req.swagger.params['X-MobilePay-Idempotency-Key'].value;
  PointOfSales.createPos(request,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,xMobilePayIdempotencyKey)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.DeletePos = function deletePos (req, res, next) {
  var posId = req.swagger.params['posId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  PointOfSales.deletePos(posId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetCheckIn = function getCheckIn (req, res, next) {
  var posId = req.swagger.params['posId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  PointOfSales.getCheckIn(posId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetPos = function getPos (req, res, next) {
  var posId = req.swagger.params['posId'].value;
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  PointOfSales.getPos(posId,authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.GetPosWithFilter = function getPosWithFilter (req, res, next) {
  var authorization = req.swagger.params['Authorization'].value;
  var xMobilePayClientId = req.swagger.params['X-MobilePay-Client-Id'].value;
  var xMobilePayClientSystemName = req.swagger.params['X-MobilePay-Client-System-Name'].value;
  var xMobilePayClientSystemVersion = req.swagger.params['X-MobilePay-Client-System-Version'].value;
  var storeId = req.swagger.params['storeId'].value;
  var beaconId = req.swagger.params['beaconId'].value;
  var merchantPosId = req.swagger.params['merchantPosId'].value;
  var active = req.swagger.params['active'].value;
  PointOfSales.getPosWithFilter(authorization,xMobilePayClientId,xMobilePayClientSystemName,xMobilePayClientSystemVersion,storeId,beaconId,merchantPosId,active)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
