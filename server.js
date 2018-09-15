var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + 'demoapp'));
app.use('/js', express.static(__dirname + '/demoapp/js'));
app.use('/css', express.static(__dirname + '/demoapp/css'));
app.use('/appFiles', express.static(__dirname + '/demoapp/appFiles'));
app.use('/controllers', express.static(__dirname + '/demoapp/controllers'));
app.use('/directives', express.static(__dirname + '/demoapp/directives'));
app.use('/pages', express.static(__dirname + '/demoapp/pages'));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.listen(process.env.PORT || 3000);

app.get('/', function(request, response) {
 response.sendFile(path.join(__dirname + '/demoapp/index.html'));
 });
