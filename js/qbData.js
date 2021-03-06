/*
 * QuickBlox JavaScript SDK
 *
 * Custom Objects module
 *
 */

// Browserify exports and dependencies
module.exports = DataProxy;
var config = require('./qbConfig');
var utils = require('./qbUtils');

var dataUrl = config.urls.base + config.urls.data;


function DataProxy(service){
  this.service = service;
  if (config.debug) { console.debug("LocationProxy", service); }
}

DataProxy.prototype.create = function(className, data, callback){
  if (config.debug) { console.debug('DataProxy.create', className, data);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className), data: data, type: 'POST'}, function(err,res){
    if (err){ callback(err, null); }
    else { callback (err, res); }
  });
};

DataProxy.prototype.list= function(className, filters, callback) {
  // make filters an optional parameter
  if (typeof callback === 'undefined' && typeof filters === 'function') {
    callback = filters;
    filters = null;
  }
  if (config.debug) { console.debug('DataProxy.list', className, filters);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className), data: filters}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};

DataProxy.prototype.update= function(className, data, callback) {
  if (config.debug) { console.debug('DataProxy.update', className, data);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className + '/' + data._id), data: data, type: 'PUT'}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};

DataProxy.prototype.delete= function(className, id, callback) {
  if (config.debug) { console.debug('DataProxy.delete', className, id);}
  this.service.ajax({url: utils.resourceUrl(dataUrl, className + '/' + id), type: 'delete'}, function(err,result){
    if (err){ callback(err, null); }
    else { callback (err, result); }
  });
};


