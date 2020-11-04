const {resolve} = require('path');

module.exports = env => {
  return {
    entry: {
      'translator': './src/app.js'
    },
    output: {
      filename: '[name].js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    devtool: env.prod ? 'source-map' : 'eval',
  };
};
