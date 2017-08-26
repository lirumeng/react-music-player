module.exports = {
  entry: __dirname + '/app/index.js',
  output: {
    path: __dirname + '/dist',
    filename:'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        // query: {
        //   presets: [ "es2015" ]
        // }
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.less/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  }
}
