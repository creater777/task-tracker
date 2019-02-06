const path = require('path');

// const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')


const config = {
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        loaders: ['sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin()
  ]
}

if (process.env.NODE_ENV === 'development'){
  config.module.rules.push(
    {
      test: /\.js$/,
      enforce: 'pre',
      use: [
        {
          options: {
            formatter: eslintFormatter,
            eslintPath: require.resolve('eslint'),

          },
          loader: require.resolve('eslint-loader'),
        },
      ],
      include: './src',
    },
  )
}

module.exports = config
