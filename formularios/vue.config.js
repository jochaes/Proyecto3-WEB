const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.100.2:3001/api',
        changeOrigin: true,
      },
    },
  },


})
