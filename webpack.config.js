const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
}
