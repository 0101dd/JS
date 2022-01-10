module.exports = {
  publicPath: './',
  chainWebpack (config) {
    config.plugin('html').tap(args => {
      args[0].title = '購物商城'
      return args
    })
  }
}
