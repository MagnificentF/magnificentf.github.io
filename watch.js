var chokidar = require('chokidar');
var tasks = require('./tasks');

chokidar.watch('src/*.scss')
	.on('all', function(event, path) {
  	console.log(event, path);
		tasks.css();
	});