var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app:[
      'webpack-dev-server/client?http://localhost:8081',
      'webpack/hot/dev-server',
      './src/react/app.jsx'
    ],
    vendors: ['react', 'react-dom', 'react-router']
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel?presets[]=stage-0,presets[]=es2015,presets[]=react'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?limit=1000000&name=[name].[ext]'
      }
    ],
    noParse: [/\.(png|woff|woff2|eot|ttf|svg)$/]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
}
