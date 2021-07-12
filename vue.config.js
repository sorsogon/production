const path = require('path');

module.exports = {
  publicPath: '/',
  outputDir: path.resolve(__dirname, 'build'),
  configureWebpack: {
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
