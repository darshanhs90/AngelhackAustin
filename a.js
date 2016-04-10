var app = require('express')();
var express = require('express');
var cfenv = require('cfenv');
var cors = require('cors');
var app = express();
var PushBullet = require('pushbullet');
var pusher = new PushBullet('Xej3VrcULqqRjo7SPkl7WJsaTkFTao8E');
var bodyParser = require('body-parser');
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var parseString = require('xml2js').parseString;

var hod = require('havenondemand');
var request=require('request');
var apikey='f9e927d7-6497-4dee-9f69-5500fb76a5ad';
var client = new hod.HODClient('http://api.idolondemand.com', apikey);
var fs=require("fs");
var fpp = require('face-plus-plus');
fpp.setApiKey('b5e783aaf612ece56decaf2ae5e6f8c8');
fpp.setApiSecret('lI2k8MecfCg9jExmgTz4JcapfOj1MSP1');
var jobId;
var data = {'file' : 'test.csv','service_name':'Suggest'};
  client.call('predict', function(err,resp,body){
    console.log(body);
  }, data);
