var express = require("express");
var app = express();

var path = '/Users/alexript/workspace/autosauler_net/Client/'

app.get('/', function(req, res){ 
  res.sendfile(path + 'index.html'); 
});

app.get('/debug', function(req, res){ 
  res.sendfile(path + 'index-debug.html'); 
});

app.get('/api', function(req, res){ 
  res.send(req.params); 
});

app.get('/*', function(req, res){
  res.sendfile(path + req.params[0]);
});



app.listen(8000);