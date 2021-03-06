var webpack = require('webpack')
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
var path = require('path')
var env = require('yargs').argv.mode

var build = env === 'build'

var version = new webpack.DefinePlugin({
  VERSION: JSON.stringify(require('./package.json').version)
})

var libname = 'scrollscout'
var ext = build ? '.min.js' : '.js'
var plugins  = build ? [new UglifyJsPlugin({ minimize: true }), version] : [version]


module.exports = {
  entry: __dirname + '/src',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: libname + ext,
    library: libname,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.js)$/,
        loader: 'babel',
        exclude: /(node_modules)/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
  },
  plugins: plugins
}

