const chokidar = require('chokidar');
const tasks = require('./tasks');
const color = require('chalk');
const debounce = require('lodash.debounce');

const css = debounce(tasks.css, 1000);
chokidar.watch('src/*.(styl|json|js)')
	.on('all', (event, path) => setTimeout(css, 1000));

const html = debounce(tasks.html, 1000);
chokidar.watch('src/*.(jade|json)')
	.on('all', (event, path) => setTimeout(html, 1000));

console.info(color.green('watchers set up'));
