var static = require('node-static');
var config = require('./config');
const color = require('chalk');

var file = new static.Server('./');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(config.port, config.ip);

console.info(color.red("Static web server started"));