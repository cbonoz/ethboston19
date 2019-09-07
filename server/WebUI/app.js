/*
 * Copyright (C) 2018 Taxa Network Inc - All Rights Reserved
 *
 */

var express = require('express');
var fileUpload = require('express-fileupload');
var app = express();

var https = require("https");
var fs = require("fs");
var path = require("path");

var configManager = require('./api/config/configManager.js');

var filesRouter = require('./api/files/filesRouter.js');
var contractRouter = require('./api/contract/contractRouter.js');

configManager.init();

app.use(fileUpload());
app.use('/api/files', filesRouter);
app.use('/api/contract', contractRouter);

// Add a global exception handler.
process.on('uncaughtException', function(err){
   console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
   console.error(err.stack);
});

var serverStartOptions = {
   key: fs.readFileSync('server.key'),
   cert: fs.readFileSync('server.crt')
};

var httpAWSServer = https.createServer(serverStartOptions, app);
httpAWSServer.listen('8002');
console.log("Running https://127.0.0.1:8002");


