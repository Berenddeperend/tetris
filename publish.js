require('dotenv').config();
const ghpages = require('gh-pages');
ghpages.publish('dist', {
  repo: `https://${process.env.GH_TOKEN}@github.com/Berenddeperend/tetris.git`
}, function(err) {
  if(err) {
    console.log('err: ', err);
  } else {
    console.log('uploaded succesful.')
  }
});