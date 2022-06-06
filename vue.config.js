const { defineConfig } = require('@vue/cli-service')
// vue.config.js
const webpack = require('webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
      proxy: {
        '/apifile':{
          target:'http://localhost:5000',//设置你调用的接口域名和端口
          changeOrigin:true,//這裡true表示实现跨域
          pathRewrite:{
            '/apifile':''
          }
        }
      }
    }
})
