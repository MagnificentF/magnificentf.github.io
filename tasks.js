exports.css = css;

var fs = require('fs');

function css () {
	console.info('css build task started');
	var postcss = require('postcss');
	var cssSrc = 'src/main.scss';
	var cssDest = 'index.css';
	postcss([
		require('postcss-simple-vars'),
		require('postcss-nested'),
		require('postcss-inline-comment')
	])
		.process(fs.readFileSync(cssSrc, "utf8"), { 
			from: cssSrc,
			to: cssDest 
		})
			.then(function (result) {
				fs.writeFileSync(cssDest, result.css);
				if (result.map) 
					fs.writeFileSync(cssDest +'.map', result.map);
				console.info('css built');
			});
}