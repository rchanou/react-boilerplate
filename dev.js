var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

/*
  this is the transpilation script for development.
  it does not actually create transpiled files.
  instead, it keeps them in memory and serves them with a local server.
  this allows hot reloading of components.
  only changes to files that export react components will be hot-reloaded.
  the browser console will print when changes are hot-loaded, or if not, why.

  Two good, simple webpack examples to check out:
  https://github.com/petehunt/webpack-howto
  https://github.com/gaearon/react-hot-boilerplate
*/

// create a config object containing various webpack options
var config = {
  // this enables source-mapping for your transpiled files
  devtool: 'source-map',

  // your app entry points.
  // starting with these files/modules,
  // webpack builds your program's dependency graph.
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'index')//'./src/index'
  ],

  // where the transpilation result will be placed
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'  // path from view of JS/HTML page
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(), // allows hot reloading
    new webpack.NoErrorsPlugin() // won't build if there are syntax errors
  ],

  // if an imported file does not have an extension, webpack will try these
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  // loader configs that determine what files webpack can include and how
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel?stage=0'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(eot|woff|ttf|svg|otf)/,
        loader: 'file-loader',
        include: path.join(__dirname, 'src')
      }
    ]
  }
};


// create a webpack compiler based on your config
var compiler = webpack(config);

// pass compiler and server options into server constructor
// then listen on a port
new WebpackDevServer(
  compiler,
  {
    hot: true, // hot reloading
    historyApiFallback: true // i'm actually not sure what this does
  }
)
.listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
