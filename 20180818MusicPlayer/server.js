var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  // supress error in console
  quiet: false,
  // supress everything except error
  noInfo: false,
  stats: {
    // config for minimal console.log mess
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timing: false,
    chunks: false,
    chunkModules: false
  }
}).listen(3000, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }
  console.log('listening at localhost:3000');
});
