const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  return {
    entry: {
      'translator.js': './src/app.js',
      'options.js': './src/app/options/options.js',
      'popup.js': './src/app/popup/popup.js',
      'style.css': [
        './src/app/style.css',
        './src/components/delimiter/style.css',
        './src/components/initiation/style.css',
        './src/components/spinner/style.css'
      ]
    },
    output: {
      filename: '[name]',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin("style.css"),
    ]
  };
};
