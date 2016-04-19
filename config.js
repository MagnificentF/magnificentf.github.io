var path = require('path');
exports.src = 'src';
exports.cssSrc = path.join(exports.src, 'main.scss');
exports.cssDest = 'index.css';
exports.htmlSrc = path.join(exports.src, 'main.jade');
exports.htmlDest = 'index.html';
exports.min = process.env.NODE_ENV === 'production';
exports.port = process.env.PORT || 3000;
exports.ip = process.env.IP || '127.0.0.1';