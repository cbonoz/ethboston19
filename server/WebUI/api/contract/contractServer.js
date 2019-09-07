/*
 * Copyright (C) 2018 Taxa Network Inc - All Rights Reserved
 *
 */

var child_process = require('child_process');

var configManager = require('../config/configManager.js');


/*
 * ContractServer
 *
 *    It invokes local taxa server to run a contract method .
 *
 */

function ContractServer() {
   this.childProcess = null;
   this.readyCb = null;
   this.closeCb = null;
   this.publicKeyPath = null
   this.contractStore = null;
   this.contractName = null;
   this.methodName = null;
   this.executeResult = '';
}


/*
 * ContractServer.prototype.init
 *
 *    Initialize the public key location and encrypted data path.
 *
 */

ContractServer.prototype.init = function(publicKeyPath, contractStore, contractName, sessionFile) {
   this.publicKeyPath = publicKeyPath;
   this.contractStore = contractStore;
   this.contractName = contractName;
   this.sessionFile = sessionFile;
   this.executeResult = '';
}


/*
 * ContractServer.prototype.run
 *
 *    Invoke the taxa server binary to encrypt on the taxa server side.
 *
 */

ContractServer.prototype.run = function(readyCb, closeCb) {
   console.log("Server start to execute contract with " +
               this.publicKeyPath +
               " and store " +
               this.contractStore +
               " contract name " +
               this.sessionFile +
               " session file " +
               this.sessionFile);

   var config = {'cwd' : configManager.getServerConfig().exeFileFolder};
   var self =this;

   this.childProcess = child_process.spawn("./taxa_server",
                                           ['pythonClassWithContext', this.publicKeyPath, this.contractStore,
                                            this.contractName, this.sessionFile],
                                           config);

   this.readyCb = readyCb ? readyCb : null;
   this.closeCb = closeCb ? closeCb : null;
   this.childProcess.stdout.on('data', (data) => {
       console.log('decrypt output is \n' + data);
       self.executeResult += data;
   });

   this.childProcess.stderr.on('data', (data) => {
      console.log(`Debug: Info: ContractServer ${data}`);
   });

   this.childProcess.on('close', (code) => {
      console.log(`ContractServer child process exited with code ${code}`);
      if (self.closeCb) {
         self.closeCb(code, self.executeResult);
      }
   });
}


/*
 * ContractServer.prototype.kill
 *
 *    Kill the contractServer server process.
 *
 */

ContractServer.prototype.kill = function() {
   console.log("Start to kill contract server process with id" + this.childProcess.pid);
   this.childProcess.stdin.pause();
   this.childProcess.kill();
}

module.exports = ContractServer;
