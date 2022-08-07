const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //禁用语法检查
  lintOnSave: false,
  //设置代理访问(跨域配置)
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088',
        changeOrigin: true,
        pathRewrite: {
          //去除前缀
          '^/api': ''
        },
        //关闭webSocketURL
        ws: false,
      }
    }
  }
})
