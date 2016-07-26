const fs = require('fs');
const config = require('./config');
const color = require('chalk');

exports.css = css;
function css (){
	console.info(color.cyan('css build task started'));

	delete require.cache[require.resolve('./src/data.json')];

	const jsonData = require('./src/data.json');

	const exhibits = [];
	for (let group in jsonData) {
		for (let id in jsonData[group]) {
			exhibits.push(Object.assign({id: id}, jsonData[group][id]));
		}
	}
	console.info(color.yellow(`${exhibits.length} exhibits processed!`));

	const stylus = require('stylus');
	stylus(fs.readFileSync(config.cssSrc, 'utf8'))
	  .set('filename', config.cssDest)
	  .define('exhibits', exhibits)
	  .render(function (err, css) {
	    if (err) console.error(color.red(err));
	    else {
	    	fs.writeFileSync(config.cssDest, css);
	    	console.info(color.cyan('css built'));
	    }
	  });

	/*var postcss = require('postcss');
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
	}*/

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