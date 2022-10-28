const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  plugins:[new HtmlWebpackPlugin({
    template: "./src/index.html"
  })],
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',

        options: {
          plugins: ['@babel/plugin-syntax-dynamic-import'],
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ]
          ]
        },

        test: /\.js$/
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
       test: /\.(png|jpe?g|gif)$/i,
       use: [
         {
           loader: 'file-loader',
         },
       ],
     },
    ]
  }
};
