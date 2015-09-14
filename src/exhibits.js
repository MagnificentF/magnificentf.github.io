module.exports = function (node) {
  delete require.cache[require.resolve('./data.json')]
  var data = require('./data.json');
  //console.log('compiling css for exhibits');
  var rules = {};
  for (type in data) {
    for (id in data[type]) {
      var exhibit = data[type][id];
      rules['#' + id] = {
        width: exhibit.width + '%',
        padding: exhibit.height / 2 + '% 0',
        margin: exhibit.top + '% 0 0 0',
        left: exhibit.left + '%',
        'background-image': `url(images/${exhibit.image})`,
        'background-repeat': 'no-repeat',
        'background-position': 'top',
        'background-size': 'cover'
      }
    }
  }
  //console.dir(rules);
  return rules;
};
