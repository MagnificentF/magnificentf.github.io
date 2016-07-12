var fs = require('fs');
var config = require('./config');
var color = require('chalk');

exports.css = css;
function css (){
	console.info(color.cyan('css build task started'));
	var postcss = require('postcss');
	try {
		postcss([
			require('postcss-mixins')({
				mixins: {
					exhibits: require('./src/exhibits')
				}
			}),
			require('postcss-simple-vars'),
			require('postcss-nested'),
			//require('postcss-strip-inline-comments'),
			require('postcss-custom-media'),
			require('postcss-color-function')
		])
			.process(fs.readFileSync(config.cssSrc, 'utf8'), {
				from: config.cssSrc,
				to: config.cssDest,
				parser: require('postcss-scss')
			})
				.then(
					function (res) {
						fs.writeFileSync(config.cssDest, res.css);
						//if (res.map)
							//fs.writeFileSync(config.cssDest +'.map', res.map);
						console.info(color.cyan('css built'));
					}
				)
				.catch(function (e) {
					console.error(color.red('css build failed'));
					//console.error(e);
				});
	} catch(e) {
		console.dir(e);
	}

}

exports.html = html;
function html() {
	console.info(color.magenta('html build task started'));
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
  console.info(color.magenta('html built'));
}

exports.soften = soften;
function soften() {
	require('findit')(config.src)
		.on('file', filePath => {
			fs.readFile(filePath, (err, data) => {
				if (err) throw err;
				var softened = String(data).replace(/\t/g, '  ');
				fs.writeFile(filePath, softened, (err) => {
					if (err) throw err;
					console.info(color.gray(`turned tabs into spaces ${filePath}`));
				});
			});
		});
}