var path = require('path');
exports.src = 'src';
exports.cssSrc = path.join(exports.src, 'main.scss');
exports.cssDest = 'index.css';
exports.htmlSrc = path.join(exports.src, 'main.pug');
exports.htmlDest = 'index.html';
exports.min = process.env.NODE_ENV === 'production';