
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default {
  entry: './src/client/index.js',
  mode: 'production',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
    libraryTarget: 'var',
    library: 'Client',
    clean: true
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true
          }
        }
      }),
      new CssMinimizerPlugin()
    ]
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
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|ico)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/views/index.html',
      filename: 'index.html',
      favicon: './src/client/public/favicon.ico'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    })
  ],
  resolve: {
    extensions: ['.js']
  }
};