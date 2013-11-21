
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    https = require('https'),
    fs = require('fs');

var app = express();


// Modify as needed
app.set('port', 3000);
app.set('postssl', 3443);

// Modify these to where your certs are
var options = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

/**
Safari will connect to this endpoint to look for your push package
*/
app.post('/v1/pushPackages/:websitePushID', function (req, res) {
    var file;
    // Load your push package .zip file or dynamically create one
    // Example:
    // file = fs.readFileSync('pushpackage.zip');

    res.set({'Content-type': 'application/zip'});
    res.send(file);
});

/**
Safari will connect to this endpoint to once the user allows push notifications.
This is where you should probably do something with the token
*/
app.post('/v1/devices/:deviceToken/registrations/:websitePushID', function (req, res) {
    console.log('tokens', req.params.deviceToken);
    res.send(200);
});


/**
Safari will connect to this endpoint to if the user wants to remove push notifications.
This is where you should probably remove the token from a database or something
*/
app.delete('/v1/devices/:deviceToken/registrations/:websitePushID', function (req, res) {
    console.log('tokens', req.params.deviceToken);
    res.send(200);
});

/**
Safari will connect to this endpoint when errors occur.
*/
app.post('/v1/log', function (req, res) {
    // Do Logging Stuff
    res.send(200);
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

https.createServer(options, app).listen(app.get('sslport'), function () {
    console.log('Express Secure server listening on port ' + app.get('sslport'));
});
