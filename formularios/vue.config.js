const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001/api',
        changeOrigin: true,
      },
    },
  },

  pwa: {
    name: 'Formularios',
    short_name: 'Formularios',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    icons: [
      {
        "src": "/img/icons/android-chrome-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/img/icons/android-chrome-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "src": "/img/icons/android-chrome-maskable-192x192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/img/icons/android-chrome-maskable-512x512.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/img/icons/apple-touch-icon.png",
        "sizes": "180x180",
        "type": "image/png"
      },
      {
        "src": "/img/icons/favicon-16x16.png",
        "sizes": "16x16",
        "type": "image/png"
      },
      {
        "src": "/img/icons/favicon-32x32.png",
        "sizes": "32x32",
        "type": "image/png"
      },
      {
        "src": "/img/icons/msapplication-icon-144x144.png",
        "sizes": "144x144",
        "type": "image/png"
      },
      {
        "src": "/img/icons/mstile-150x150.png",
        "sizes": "150x150",
        "type": "image/png"
      }
    ],

    manifestOptions: {
      background_color: '#000000',
    },
    workboxOptions: {
      skipWaiting: true,
    },
  },


})
