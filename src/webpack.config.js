const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// eslint-disable-next-line no-unused-vars
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// eslint-disable-next-line no-unused-vars
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
      contentBase: path.resolve(__dirname, 'public/assets'),
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
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
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
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
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
      }, {
        test: /\.(json)$/,
        type: 'javascript/auto',
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            // loader: 'file-loader',
            loader: 'file-loader', // 'url-loader?limit=1000', // 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/misc/',
            },
          },
        ],
      }],
    },
    mode: 'development',
    plugins: [
      new CleanWebpackPlugin(['public']),
      // new HtmlWebpackPlugin({
      //     template: 'index.html'
      // }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      extractPlugin,
      // extract vendor chunks for better caching
      new webpack.optimize.SplitChunksPlugin({
        name: 'vendor',
        minChunks(module) {
          // a module is extracted into the vendor chunk if...
          return (
            // it's inside node_modules
            /node_modules/.test(module.context)
            // and not a CSS file (due to extract-text-webpack-plugin limitation)
            && !/\.css$/.test(module.request)
          );
        },
      }),
      // extract webpack runtime & manifest to avoid vendor chunk hash changing
      // on every build.
      new webpack.optimize.SplitChunksPlugin({
        name: 'manifest',
      }),
    ],
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
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader'],
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
      }],
    },
    mode: 'development',
    plugins: [
      new CleanWebpackPlugin(['public']),
      // new HtmlWebpackPlugin({
      //     template: 'index.html'
      // }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      // new webpack.IgnorePlugin(/\/iconv-loader$/),
      new StatsPlugin('stats.json', {
        chunkModules: true,
        modules: true,
        chunks: true,
        exclude: [/node_modules[\\/]react/],
      }),
    ],
  },
];
