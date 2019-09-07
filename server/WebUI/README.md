# WebUI
web service and its admin ui

###### Install

Install latest node and npm on your machine.\n
Note: on ubuntu machine, there are nodejs and legacynode. Please install legacynode.
Or you need to modify package.json in the root folder. Search for node app.js and replace node with nodejs you installed.

After installing node and package, go to the root folder and run "npm install" to install all the dependency packages.

###### Configure

Befere you run the web service, you need to modify the data/config.json to config your system.
```
{
  "name": "TaxaUI",
  "description": "Taxa Management UI",
  "version": "0.0.1",
  "serverConfig" : {
     "exeFileFolder" : "/home/ubuntu/taxa-server/taxa-alpha/taxa_server/Application"
  },
  "fileStoreConfig" : {
     "tmpFolder": "/tmp"
  },
  "contractConfig" : {
     "folder" : "/home/taxa/file"
  }
}
```
- serverConfig.exeFileFolder: specify taxa_server.exe location in the system.
- fileStoreConfig.tmpFolder: specify the folder to store temporary file used by Taxa Web Service.
- contractConfig.folder: specify the folder to store python contract used by Taxa Web Service.

For all the folder configurations, please don't add '/' at the end of file path.


###### Run
After you configure the system properly, type "npm run start". Here you go.

###### Params

body example:
{
  "publicKey":"7e 54 1e 13 ef af be b0 36 06 60 7b 81 c9 c1 db f7 5c 2a fc c8 9f 56 52 ae 60 6a 10 c7 6f 32 d1 08 c9 2d 02 f4 cb d5 26 05 c5 13 9a 53 2f a2 0e 60 57 e7 6f 63 f3 7b 03 38 c8 93 19 76 11 52 44",
  "contractName":"testSha256",
  "methodName":"methodB",
  "data": {"item1": "norgnodfjgdspofjgo;dfijgdosfijgsdofijgosdf"},
  "params": {"a":"3"},
  "header": {"user" : "text"},
  "contentTransferEncoding": "raw",
  "code": ""
}
