/* compression */
const BrotliPlugin = require('brotli-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')

/* bundle analyzer */
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

const compressionTest = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const compressionPlugins = [
  new CompressionPlugin({
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, compressionOptions, callback)
    },
    compressionOptions: {
      numiterations: 15
    },
    minRatio: 0.99,
    test: compressionTest
  }),
  new BrotliPlugin({
    test: compressionTest,
    minRatio: 0.99
  })
]

module.exports = {
  publicPath:
    process.env.NODE_ENV === `production`
      ? process.env.VUE_APP_PUBLIC_PATH
      : '/',
  configureWebpack: config => {
    if (process.env.NODE_ENV === `production`) {
      config.optimization.splitChunks.chunks = 'all'
      config.plugins.push(
        // new BundleAnalyzerPlugin(),
        ...compressionPlugins
      )
    }
  }
}
