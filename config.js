var path = require('path');
exports.src = 'src';
exports.htmlSrc = path.join(exports.src, 'main.jade');
exports.htmlWww = 'index.html';
exports.min = process.env.NODE_ENV === 'production';