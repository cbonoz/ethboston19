/*
 * Copyright (C) 2018 Taxa Network Inc - All Rights Reserved
 *
 */

var express = require('express');
var fs = require('fs');
var uuid = require('uuid/v4');
var querystring = require('querystring');

var configManager = require('../config/configManager.js');
var ContractServer = require('./contractServer.js');
var contractRouter = express.Router();


/*
 * Handle contract execution
 *
 *     handle contract execution.
 */

contractRouter.post('/start', function(req, res) {

   console.log("Start a new contract execution.");
   var reqBody = '';
   req.on('error', function(err) {
         console.error(err);
   }).on('data', function(chunk) {
      reqBody += chunk;
   }).on('end', function() {
       var body = JSON.parse(reqBody);
       console.log(reqBody);
       console.log(JSON.stringify(body));
       var publicKey = body.publicKey;
       var contractName = body.contractName;
       var methodName = body.methodName;
       var data = body.data;
       var params = body.params;
       var header = body.header;
       var code = body.code || "";
       var contentTransferEncoding = body.contentTransferEncoding || "base64";

       var contractStore = configManager.getContractStoreConfig().folder || "";
       var fileUUID = uuid();
       console.log("uuid is " + fileUUID);
       console.log("contractName is " + contractName);
       console.log("methodName is " + methodName);
       var tmpFolder = configManager.getTmpFolder(fileUUID);
       if (!fs.existsSync(tmpFolder)) {
         fs.mkdirSync(tmpFolder);
       }

       var publicKeyPath = tmpFolder + '/temptaxa.crt';
       var sessionFilePath = tmpFolder + '/sessionFile';

       var i = 0;
       var publicContent = publicKey.split(' ');
       var publicBuffer = new Buffer(publicContent.length);
       for (i = 0; i < publicBuffer.length; i++) {
         // console.log(parseInt(publicContent[i], 16));
         publicBuffer[i] = parseInt(publicContent[i], 16);
       }
       fs.writeFileSync(publicKeyPath, publicBuffer);

       var sessionObj = {
          "taxa_version": "0",
          "data": data,
          "app_id": contractName,
          "function": "/" + methodName,
          "param": params,
          "header": header,
          "pyxa-version": "0.1",
          "code": code,
          "direction": 0,
          "content-type": "text/plain",
          "content-transfer-encoding": contentTransferEncoding
       };

       // console.log("JSON SESSION: " + JSON.stringify(sessionObj));
       fs.writeFileSync(sessionFilePath, JSON.stringify(sessionObj));

       var contractServerInstance = new ContractServer();
       contractServerInstance.init(publicKeyPath, contractStore, contractName, sessionFilePath);
       contractServerInstance.run(null, function(code, executionResult) {

             //contractServerInstance.kill();
             console.log("Execution result is " +  executionResult);
             var jsonResult = {'status': 'success',
                               'response': executionResult
                              };
             res.setHeader('Content-Type', 'application/json');
             res.send(JSON.stringify(jsonResult));
             res.end();
       });
   });
});

module.exports = contractRouter;
