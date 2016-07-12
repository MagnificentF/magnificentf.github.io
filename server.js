const static = require('node-static');
const config = require('./config');
const color = require('chalk');

const file = new static.Server('./');

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        file.serve(request, response);
    }).resume();
}).listen(config.port, config.ip);

console.info(color.blue.underline(`Server started at ${config.ip}:${config.port}`));