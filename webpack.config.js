const { resolve } = require('path');
const webpack = require('webpack');
const CleanupPlugin = require('webpack-cleanup-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');

const { ifProduction, ifNotProduction } = getIfUtils(process.env.NODE_ENV);

module.exports = {
  devtool: ifProduction('source-map', 'eval'),
  entry: {
    app: removeEmpty([
      ifNotProduction('webpack-dev-server/client?http://localhost:3000'),
      ifNotProduction('webpack/hot/only-dev-server'),
      'react-hot-loader/patch',
      'babel-polyfill',
      resolve(__dirname, 'src/index.js'),
    ]),
  },
  output: {
    path: resolve(__dirname, 'build'),
    filename: ifProduction('[name]-[chunkhash:8].js', '[name].js'),
    publicPath: ifProduction('/', '/static/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve(__dirname, 'src'),
        query: {
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        use: ifProduction(
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[hash:base64:5]',
                },
              },
              'postcss-loader',
            ],
          }),
          [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[folder]__[local]__[hash:base64:5]',
              },
            },
            'postcss-loader',
          ]
        ),
      },
    ],
  },
  plugins: removeEmpty([
    new webpack.NamedModulesPlugin(),
    ifNotProduction(new webpack.HotModuleReplacementPlugin()),
    ifProduction(
      new CleanupPlugin({
        exclude: ['service-worker.js'],
      })
    ),
    ifProduction(new HtmlWebpackPlugin({ template: './public/template.ejs' })),
    ifProduction(new ExtractTextPlugin('styles-[chunkhash:8].css')),
    ifProduction(new StyleExtHtmlWebpackPlugin()),
    ifProduction(
      new CopyPlugin([{ from: 'public', to: '' }], {
        ignore: ['.DS_Store', 'template.ejs'],
      })
    ),
    ifProduction(
      new SWPrecacheWebpackPlugin({
        cacheId: 'react-hn',
        minify: true,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/hacker-news\.firebaseio\.com\//,
            handler: 'networkFirst',
          },
        ],
      })
    ),
  ]),
  resolve: {
    modules: [resolve('./src'), 'node_modules'],
  },
};
