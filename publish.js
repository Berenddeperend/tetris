const ghpages = require('gh-pages');
ghpages.publish('dist', {
  repo: "https://github.com/Berenddeperend/tetris.git"
}, function(err) {
  console.log('ddint wurk', err)
});