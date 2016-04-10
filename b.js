var request = require('request');
var fs=require('fs');
var needle=require('needle');

/*var FormData = require('form-data');

var form = new FormData();
form.append('apikey',"f9e927d7-6497-4dee-9f69-5500fb76a5ad");
form.append("service_name", "Suggest");
form.append("file", fs.createReadStream("test.csv"));
//  	console.log(form);

form.getLength(function(err, length){
  if (err) {
    return requestCallback(err);
  }

  var r = request.post("https://api.havenondemand.com/1/api/sync/predict/v1", requestCallback);
  r._form = form;     
  r.setHeader('Content-Length', length);
  r.setHeader('Content-Type', 'application/x-www-form-urlencoded');
  r.setData(form);

});

function requestCallback(err, res, body) {
  console.log(body);
}
*/
/*var FormData = require('form-data');

var formdat = new FormData();
formdat.append('apikey',"f9e927d7-6497-4dee-9f69-5500fb76a5ad");
formdat.append("service_name", "Suggest");
formdat.append("file", fs.createReadStream("test.csv"));
var request = require('request');

request.post(
    'https://api.havenondemand.com/1/api/sync/predict/v1',
    { form: formdat},
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }

        	console.log(body);
    }
);*/

var data={}
data["file"]={'file':data["test.csv"],'content_type':'multipart/form-data'}
data.apikey=this.apikey;
needle.post(url, data, { multipart: true }, callbackmanager);