const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8989', //申请的路径
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          //重写路径
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  }
})
