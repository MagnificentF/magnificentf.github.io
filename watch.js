var chokidar = require('chokidar');
var tasks = require('./tasks');

chokidar.watch('src/*.scss')
	.on('all', function(event, path) {
  	console.log(event, path);
		setTimeout(tasks.css, 1000);
	});

chokidar.watch('src/*.jade')
	.on('all', function(event, path) {
  	console.log(event, path);
		setTimeout(tasks.html, 1000);
	});