import path from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import assets from 'postcss-assets';
import autoprefixer from 'autoprefixer';
import config from './config.json';

const src = path.join(__dirname, 'src/app');

console.warn(path.join(src, '/components'));

export default {
  output: {
    path: path.resolve(__dirname, config.buildDir),
    publicPath: '/',
    filename: '[name]---[hash].js',
    sourceMapFilename: 'maps/[file].map'
  },

  plugins: [
    new ProgressBarPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    new HtmlWebpackPlugin({ template: 'src/index.ejs', favicon: 'src/favicon.ico', inject: false })
  ],

  resolve: {
    alias: {
      'createjs-preloadjs$': 'createjs-preloadjs/lib/preloadjs-0.6.2.combined.js',
      modernizr$: path.resolve(__dirname, '.modernizrrc'),
      'react': 'react-lite',
      'react-dom': 'react-lite',
      'components': path.join(src, '/components'),
      'containers': path.join(src, '/containers'),
      'constants':  path.join(src, '/constants'),
      'actions':    path.join(src, '/actions'),
      'reducers':   path.join(src, '/reducers'),
      'sagas':      path.join(src, '/sagas'),
      'store':      path.join(src, '/store'),
      'selectors':  path.join(src, '/selectors'),
      'config':     path.join(src, '/config'),
      'utils':      path.join(src, '/utils'),
    }
  },

  module: {
    preLoaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' },
            { test: /\.html$/, exclude: /node_modules/, loader: 'htmlhint' }
    ],
    loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.json$/, loader: 'json' },
            { test: /\.html$/, loader: 'html' },
            { test: /\.(eot|woff(2)?|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file?name=fonts/[name]---[hash].[ext]' },
            { test: /\.(png|jpg)$/, loader: 'file?name=images/[name]---[hash].[ext]' },
            { test: /\.(mp3|mp4|webm|ogg)$/, loader: 'file?name=media/[name]---[hash].[ext]' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss') },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src', 'app'),
          path.resolve(__dirname, 'src', 'entry')
        ],
        loader: ExtractTextPlugin.extract('style', [
          'css?importLoaders=1&modules&localIdentName=[local]---[hash:base64:5]',
          'postcss',
          'sass',
          'sass-resources'
        ])
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src', 'assets', 'scssSprite'),
        loader: 'file?name=cssSprite/[name]---[hash].css!postcss!sass!sass-resources'
      },
            { test: /\.modernizrrc$/, loader: 'modernizr!json' },
            { test: /createjs-preloadjs/, loader: 'imports?this=>global!exports?window.createjs' },
            { test: /gsap/, loader: 'exports?window' }
    ]
  },

  postcss() {
    return [assets, autoprefixer({ browsers: config.autoprefixer })];
  },

  sassResources: path.resolve(__dirname, 'src', 'entry', 'style', 'shared', 'shared.scss')
};
