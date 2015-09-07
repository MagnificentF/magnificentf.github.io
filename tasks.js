var fs = require('fs');
var config = require('./config');

exports.css = css;
function css (){
	console.info('css build task started');
	var postcss = require('postcss');
	postcss([
		require('postcss-inline-comment')(),
		require('postcss-mixins'),
		require('postcss-simple-vars'),
		require('postcss-nested'),
	])
		.process(fs.readFileSync(config.cssSrc, "utf8"), { 
			from: config.cssSrc,
			to: config.cssDest 
		})
			.then(
				function (res) {
					fs.writeFileSync(config.cssDest, res.css);
					//if (res.map) 
						//fs.writeFileSync(config.cssDest +'.map', res.map);
					console.info('css built');
				}
			)
			.catch(function (e) {
				console.error(e);
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
  fs.writeFile(config.htmlDest, tpl({
		config: config,
		data: require('./data')
	}));
  console.log('html built');
}