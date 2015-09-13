var chokidar = require('chokidar');
var tasks = require('./tasks');

chokidar.watch('src/*.(scss|json|js)')
	.on('all', function(event, path) {
  	console.log(event, path);
		setTimeout(tasks.css, 1000);
	});

chokidar.watch('src/*.(jade|json)')
	.on('all', function(event, path) {
  	console.log(event, path);
		setTimeout(tasks.html, 1000);
	});

console.info('watchers set up');
