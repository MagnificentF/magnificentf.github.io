var chokidar = require('chokidar');
var tasks = require('./tasks');

chokidar.watch('src/*.scss')
	.on('all', function(event, path) {
  	console.log(event, path);
		tasks.css();
	});

chokidar.watch('src/*.jade')
	.on('all', function(event, path) {
  	console.log(event, path);
		tasks.html();
	});