/*
 * Copyright (C) 2018 Taxa Network Inc - All Rights Reserved
 *
 */

var fs = require("fs");
var path = require("path");


/*
 * ConfigManager
 *
 *    Manage all the configurable items.
 */

var ConfigManager = function() {
   this.configFile = "";
   this.globalConfig = {};
}


/*
 * ConfigManager.prototype.init
 *
 *    Initialize the config file location. If no value is passed,
 *    use the default one.
 */

ConfigManager.prototype.init = function(configFile) {
   this.configFile = configFile || path.join(".", "data", "config.json");
   console.log("config file path is " + this.configFile);

   var configFileContent = fs.readFileSync(this.configFile);
   //console.log("taskConfigContent is " + taskConfigContent);
   this.globalConfig = JSON.parse(configFileContent);
};


/*
 * ConfigManager.prototype.getServerConfig
 *
 *    Return the server config information.
 */

ConfigManager.prototype.getServerConfig = function() {
   return this.globalConfig.serverConfig || {};
};

/*
 * ConfigManager.prototype.getFileStoreConfig
 *
 *    Return the file store information.
 */

ConfigManager.prototype.getFileStoreConfig = function() {
   return this.globalConfig.fileStoreConfig;
};


/*
 * ConfigManager.prototype.getContractStoreConfig
 *
 *    Return the file store information.
 */

ConfigManager.prototype.getContractStoreConfig = function() {
   return this.globalConfig.contractConfig || {};
};

/*
 * ConfigManager.prototype.getTmpFolder
 *
 *    Return the tmp folder location to store all the temp files.
 */

ConfigManager.prototype.getTmpFolder = function(taskID) {
   return this.globalConfig.fileStoreConfig.tmpFolder + '/taxatask' + taskID;
};


// we only have one singleton instance for config manager
if (!global.ConfigManager) {
   global.ConfigManager = new ConfigManager();
}

module.exports = global.ConfigManager;