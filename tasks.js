var fs = require('fs');
var config = require('./config');

exports.css = css;
function css (){
	console.info('css build task started');
	var postcss = require('postcss');
	try {
		postcss([
			require('postcss-inline-comment')(),
			require('postcss-mixins')({
				mixins: {
					exhibits: require('./src/exhibits')
				}
			}),
			require('postcss-simple-vars'),
			require('postcss-nested'),
		])
			.process(fs.readFileSync(config.cssSrc, 'utf8'), {
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
					console.error('css build failed');
					//console.error(e);
				});
	} catch(e) {
		console.dir(e);
	}

}

exports.html = html;
function html() {
	console.info('building html');
	var pug = require('pug');
	var tpl = pug.compileFile(
		config.htmlSrc, {
			cache: false,
			pretty: !config.min
		}
	);
  fs.writeFile(config.htmlDest, tpl({
		config: config,
		data: require('./src/data')
	}));
  console.log('html built');
}
