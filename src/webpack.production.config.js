/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const extractPlugin = new ExtractTextPlugin({
  filename: './style.css',
});

module.exports = [
  {
    name: 'client',
    target: 'web',
    entry: './client.js',
    output: {
      filename: 'client.js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/kenburns/unum/public/',
    },
    context: path.resolve(__dirname, 'src'),
    devServer: {
      contentBase: path.resolve(__dirname, 'output/assets'),
      stats: 'errors-only',
      open: true,
      port: 8080,
      compress: true,
    },
    module: {
      rules: [{
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/image/',
            },
          }],
      }, {
        test: /.(scss|css)$/,
        use: extractPlugin.extract({
          use: ['css-loader', 'sass-loader', 'postcss-loader'],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules\/)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
          },
        },
      }, {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'file-loader', // 'url-loader?limit=1000', // 'file-loader',
            options: {
              name: '/fonts/[name].[ext]',
              outputPath: './assets/',
            },
          },
        ],
      }],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      }),
      new CleanWebpackPlugin(['public']),
      // new webpack.optimization.minimize({
      //   compress: {
      //     warnings: false,
      //     screw_ie8: true,
      //     drop_console: true,
      //     drop_debugger: true,
      //   },
      // }),
      // new webpack.optimize.OccurrenceOrderPlugin(),
      extractPlugin,
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // Must be set to true if using source-maps in production
          test: /\.js(\?.*)?$/i,
        }),
      ],
    },
  },
  {
    name: 'server',
    target: 'node',
    entry: './server.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'server.js',
      library: 'app',
      libraryTarget: 'commonjs2',
      publicPath: '/kenburns/unum/public/',
    },
    context: path.resolve(__dirname, 'src'),
    devtool: 'source-map',
    module: {
      rules: [{
        test: /\.(jpg|png|gif|svg|ico)$/,
        use: [
          {
            loader: 'file-loader?emitFile=false',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/image/',
            },
          }],
      }, {
        test: /\.scss$/,
        loader: 'css-loader/locals',
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
          },
        },
      }, {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      }, {
        test: /\.(xml)$/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'file-loader', // 'url-loader?limit=1000', // 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/xmls/',
            },
          },
        ],
      }],
    },
    plugins: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: { discardComments: { removeAll: true } },
      }),
      new StatsPlugin('stats.json', {
        chunkModules: true,
        modules: true,
        chunks: true,
        exclude: [/node_modules[\\\/]react/],
      }),
    ],
  },
];
