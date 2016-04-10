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
//var apikey='f3129194-4f03-4419-80c2-f3aa041baf9a';
var apikey='f9e927d7-6497-4dee-9f69-5500fb76a5ad';
var client = new hod.HODClient('http://api.idolondemand.com', apikey);
var fs=require("fs");
var fpp = require('face-plus-plus');
fpp.setApiKey('b5e783aaf612ece56decaf2ae5e6f8c8');
fpp.setApiSecret('lI2k8MecfCg9jExmgTz4JcapfOj1MSP1');
var jobId;



app.listen(1337, '127.0.0.1', function() {
	console.log("server starting on " + 1337);
});


app.get('/fppCheck',function(reqst,respns){
	var parameters = {
		attribute: 'gender,age',
		img : {
			//value: fs.readFileSync('../../../EHARIHS/Downloads/test.jpg')
			value: fs.readFileSync('/Users/Darshan/Downloads/test.png')
			, meta: {filename:'test.png'}
		}
	};
	fpp.post('detection/detect', parameters, function(err, res) {
		console.log(res);
		respns.send(res);
		//fs.unlinkSync('../../../EHARIHS/Downloads/test.jpg');
		fs.unlinkSync('/Users/Darshan/Downloads/test.png');
		respns.end();
	});
});



app.get('/facedetectCheck',function(reqst,respns){
	//data={'file':'../../../EHARIHS/Downloads/test.jpg',	'additional':'true'}
	data={'file':'/Users/Darshan/Downloads/test.png',	'additional':'true'}
	client.call('detectfaces', function(err,resp,body){
		respns.send(body);
		//fs.unlinkSync('/Users/Darshan/Downloads/test.png');
		respns.end();
	}, data)
});

var sentimentText='';
app.get('/analyzeSentiment',function(reqst,respns){
	var data = {'text' : sentimentText};
	console.log(sentimentText);
	client.call('analyzesentiment', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data);
});

app.get('/analyzeSentimentalAnalysis',function(reqst,respns){
	var data = {'text' : reqst.query.sentiment};
	console.log(sentimentText);
	client.call('analyzesentiment', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data);
});

var text='';
app.get('/extracttext',function(reqst,respns){
	data={'file':'./resume.pdf'}
	client.call('extracttext', function(err,resp,body){
		respns.send(body);
		text=body.document[0].content;
		text=text.replace('(123)456-7890','4697672278');
		text=text.replace('JNTUH','University of Texas');
		respns.end();
	}, data)

});

app.get('/resscore',function(reqst,respns){
	request.post(
    'http://rezscore.com/a/c7c65b/grade',
    { form: { resume: './res.pdf' } }, function(err,res,body){
		var xml = body;
		parseString(xml, function (err, result) {
		    console.log(result.rezscore.score);
		    respns.send(result);
			respns.end();
		});
		
	});
});

app.get('/analyzeSpeech',function(reqst,respns){
	data={'file':'./public/recordrtc-nodejs/uploads/Test.wav'};
	client.call('recognizespeech', function(err,resp,body){
		console.log(body);
		jobId=body.data.jobID;
		respns.send(body);
		//fs.unlinkSync('./public/recordrtc-nodejs/uploads/Test.wav');
		respns.end();
	}, data,true)
});


app.get('/checkStatus',function(reqst,respns){
-	request('http://api.idolondemand.com/1/job/status/'+jobId+'?apikey=f3129194-4f03-4419-80c2-f3aa041baf9a',function(err,res,body){
		console.log("SEE"+JSON.parse(body).actions);
		respns.send(JSON.parse(body));
		try{
		sentimentText=JSON.parse(body).actions[0].result.document[0].content;
		}
		catch(err){
			//
		}
		finally{
		respns.end();
		}
	});
});

app.get('/conceptExtraction',function(reqst,respns){
	data={'text':text}
	client.call('extractconcepts', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data)

});

app.get('/extractentities',function(reqst,respns){
	data={'text':text,'entity_type':['person_name_component_eng','address_us','people_eng','companies_eng','organizations','places_eng','professions','universities','person_fullname_eng','number_phone_us','languages','internet','internet_email']}
	client.call('extractentities', function(err,resp,body){
		respns.send(body);
		respns.end();
	}, data)
});

//ujyob53T1uSsjz7O3P0Jl6
//ujxoVhoOrjosjz7O3P0Jl6
app.get('/sendPushBullet',function(reqst,respns){
	var name=reqst.query.name;
	pusher.note('ujxoVhoOrjosjz7O3P0Jl6', 'UniConnect', 'You\'ve got a video call request from '+name+".Navigate to https://opentokrtctestdemo.herokuapp.com/demo to join the video call", function(error, response) {
                    
                    respns.end();});
});

app.get('/predictor',function(reqst,respns){
	var data = {'file' : 'test.csv','service_name':'Suggest'};
  client.call('predict', function(err,resp,body){
    respns.send(body);
  }, data);
});



