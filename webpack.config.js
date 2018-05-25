const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


const CopyWebpackPlugin = require('copy-webpack-plugin');// for loaded images

const images = ['jpg', 'jpeg', 'png', 'gif', 'svg'];// for loaded images

// const stylesLoader = [
//   { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' },
//   { test: /\.css$/, loader: 'style-loader!css-loader' },
//   { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
//   { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
//   { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
//   { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
// ];

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Test app',
    template: 'index.html'
  }),
  new webpack.ProvidePlugin({
    React: 'react',
    Component: ['react', 'Component'],
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new CopyWebpackPlugin([
    ...images.map(ext => ({ from: `**/asset/*.${ext}`, to: 'images/asset/[name].[ext]' })),
    ...images.map(ext => ({ from: `**/icon/*.${ext}`, to: 'images/icon/[name].[ext]' })),
    ...images.map(ext => ({ from: `*/*.${ext}`, to: 'images/[name].[ext]' }))
  ]),
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin({
    filename: 'styles[name].css',
    allChunks: true
  })
];

module.exports = {
  entry: ['babel-polyfill', './app.js'],
  context: path.resolve('src'),
  output: {
    filename: 'bundle-[name].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-0'],
            plugins: [
              'syntax-dynamic-import',
              'transform-class-properties',
              'transform-object-rest-spread',
              'transform-regenerator'
            ]
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        })
      },
      { test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/, loader: 'url-loader?mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/, loader: 'file-loader?name=[name].[ext]' },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true
        }
      }
    ]
  },

  plugins,

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },
  mode: 'development',
  devServer: {
    contentBase: path.resolve('dist'),
    publicPath: '/',
    port: 3030,
    hot: true,
    historyApiFallback: true
  }
};

