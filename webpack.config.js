const {resolve} = require('path');

module.exports = env => {
  return {
    entry: {
      'translator': './src/app.js',
      'options': './src/app/options/options.js',
      'popup': './src/app/popup/popup.js',
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    devtool: env.prod ? 'source-map' : 'eval',
  };
};
