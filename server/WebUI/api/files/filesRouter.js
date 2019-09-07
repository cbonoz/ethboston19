/*
 * Copyright (C) 2018 Taxa Network Inc - All Rights Reserved
 *
 */

var express = require('express');
var filesRouter = express.Router();
var querystring = require('querystring');
var configManager = require('../config/configManager');


/*
 * filesRouter/download
 *
 *    Handle regular file download request. Right now, all the regular files are stored
 *    at the a fixed directory.
 *
 */

filesRouter.get('/download', function(req, res){
   console.log("Get download request.\n");
   var queryParams = querystring.parse(req.url.replace(/^.*\?/, ''));
   var fileStore = configManager.getFileStoreConfig().computedResult;
   var file = fileStore + '/' + queryParams.folderName + '/' + queryParams.fileName;
   console.log('Downloading file is ' + file);
   // Set disposition and send it.
   res.download(file);
});


/*
 * filesRouter/upload
 *
 *    Handle file upload request for web client.
 *
 */

filesRouter.post('/upload', function(req, res) {
   if (!req.files) {
      return res.status(400).send('No files were uploaded.');
   }

   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   var sampleFile = req.files.sampleFile;
   var localFileName = __dirname + '/../../data/' + sampleFile.name;

   // Use the mv() method to place the file somewhere on your server
   sampleFile.mv(localFileName, function(err) {
      if (err) {
         console.log("Failed to upload file for " + sampleFile.name);
         return res.status(500).send(err);
      }

      res.end();
   });
});

module.exports = filesRouter;

