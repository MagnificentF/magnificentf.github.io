var fs = require('fs');
var config = require('./config');

exports.css = css;
function css (){
	console.info('css build task started');
	var postcss = require('postcss');
	var cssSrc = 'src/main.scss';
	var cssDest = 'index.css';
	postcss([
		require('postcss-inline-comment'),
		require('postcss-mixins'),
		require('postcss-simple-vars'),
		require('postcss-nested'),
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

exports.html = html;
function html() {
	console.info('building html');
	var jade = require('jade');
	var tpl = jade.compileFile(
		config.htmlSrc, {
			cache: false,
			pretty: !config.min
		}
	);
  fs.writeFile(config.htmlWww, tpl({
		config: config,
		data: require('./data')
	}));
  console.log('html built');
}