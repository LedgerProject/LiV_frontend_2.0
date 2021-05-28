const UnusedWebpackPlugin = require('unused-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const sharp = require('responsive-loader/sharp')
const path = require('path')
const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const root = path.resolve(__dirname, resolveApp('src'))
const { ArgumentParser } = require('argparse')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const parser = new ArgumentParser({
  addHelp: true,
})

if (process.env.NODE_ENV === 'production' && !process.env.VUE_APP_BUNDLE_ANALYZER) {
  parser.addArgument('build')
  parser.addArgument(['--set-build-version'], {
    metavar: 'VALUE',
    help: 'Set build version env key. Equivalent to --env-arg BUILD_VERSION [VALUE]',
    type: 'string',
    dest: 'setBuildVersion',
  })
  const args = parser.parseArgs()

  if (args.setBuildVersion) {
    process.env.VUE_APP_BUILD_VERSION = args.setBuildVersion
  }
}

const optionalPlugins = []

if (process.env.NODE_ENV !== 'test') {
  optionalPlugins.push(
    new UnusedWebpackPlugin({
      directories: [path.join(__dirname, 'src')],
      failOnUnused: process.env.NODE_ENV === 'production',
      exclude: ['*.spec.js', '*.e2e.js', '*.md', 'test/*'],
    }),
  )
}

if (process.env.VUE_APP_BUNDLE_ANALYZER === 'true') {
  optionalPlugins.push(new BundleAnalyzerPlugin())
}

module.exports = {
  devServer: {
    port: 8095,
  },
  runtimeCompiler: true,
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'false' : 'source-map',
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, resolveApp('static')),
          to: 'static',
        },
      ]),
      ...optionalPlugins,
    ],
    resolve: {
      symlinks: false,
      alias: {
        '@': `${root}/`,
        '@static': path.resolve(__dirname, resolveApp('static')),
        '@scss': `${root}/scss`,
        '@locales': `${root}/i18n/resources`,
        '@/vuex': `${root}/vuex`,
        '@/vue-router': `${root}/vue-router`,
      },
    },
  },
  css: {
    loaderOptions: {
      sass: {
        sourceMap: true,
      },
    },
  },

  chainWebpack: config => {
    // Pre-fetching ALL the chunks harms the app performance
    config.plugins.delete('prefetch')

    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')

    // Fix issue with url(...) imports in SASS
    const moduleTypes = ['vue-modules', 'vue', 'normal-modules', 'normal']
    moduleTypes.forEach(rule => {
      config.module.rule('scss')
        .oneOf(rule)
        .use('resolve-url-loader')
        .loader('resolve-url-loader')
        .before('sass-loader')
        .end()
        .use('sass-loader')
        .loader('sass-loader')
        .tap(options => ({
          ...options,
          sourceMap: true,
        }))
    })

    config.module
      .rule('images')
      .test(/^((?!\/node_modules).)*(\.png|\.jpg|\.jpeg)$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.esModule = false
        const fallback = options.fallback
        fallback.loader = 'responsive-loader'
        fallback.options = {
          ...fallback.options,
          adapter: sharp,
          name: 'img/[name]-[hash]-[width].[ext]',
          sizes: [375, 768, 1200, 1920, 2880, 3840],
        }

        return options
      })
  },
}
