/**
 * Created by xuyujin on 2018/8/13.
 * vue-cli 3.0的配置文件
 * 文档: https://cli.vuejs.org/zh/config/
 */

module.exports = {
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',
  publicPath: '/dayuepd-h5/',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({ // 把px单位换算成rem单位
            rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
            propList: ['*']
          })
        ]
      }
    }
  },
  // 热更新配置
  devServer: {
    proxy: {
      // 跨域代理设置
      //https://dayuemedical.com.cn
      '/common-rest': {
        // target: 'https://www.dayue.org.cn',
        target: 'https://dayuemedical.com.cn',
        ws: true,
        changeOrigin: true,
        secure: false
      },
      '/pp-rest': {
        // target: 'https://www.dayue.org.cn',
        target: 'https://dayuemedical.com.cn',
        ws: true,
        changeOrigin: true,
        secure: false
      },
      '/pp-admin': {
        // target: 'https://www.dayue.org.cn',
        target: 'https://dayuemedical.com.cn',
        ws: true,
        changeOrigin: true,
        secure: false
      }
    }
  }
};
