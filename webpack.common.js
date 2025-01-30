const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
module.exports = {
  entry: "./src/js/index.js",
  plugins:[
    new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
  new CopyWebpackPlugin({
    patterns: [{ from: path.resolve(__dirname, "./static") }],
  }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
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
        }
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
       test: /\.(png|jpe?g|gif|obj|fbx|glb|gltf)$/i,
       use: [
         {
           loader: 'file-loader',
         },
       ],
     },
      {
        test: /\.obj$/,
         use: [
           {loader: 'webpack-obj-loader',}
        ],
      },
    ]
  }
};
