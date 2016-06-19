var static = require('node-static');
var config = require('./config');

var file = new static.Server('./');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(config.port, config.ip);

console.info("Static web server started");