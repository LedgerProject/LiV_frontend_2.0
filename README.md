# LiV Frontend

## Built with
* [Vue.js](https://vuejs.org/)
* [JavaScript](https://www.javascript.com/)
## Software used
* [npm](https://www.npmjs.com/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Postman](https://www.postman.com/)
* [GitHub](https://github.com/)
## Side technologies
### Production dependencies
* @mdi/font: Material Design Webfont
* axios: promise based HTTP client
* core-js: standard JS library
* husky: git hooks
* i18next: internationalization framework
* i18next-browser-languagedetector: language detector used in browser environment for i18next
* lodash: Lodash modular utilities
* loglevel: logging for JavaScript
* maska: input mask
* moment: parse, validate, manipulate, and display dates
* moment-timezone: parse and display moments in any timezone
* nprogress: progressbar
* resolve-url-loader: loader that resolves relative paths
* url-loader: loader for webpack which transforms files into base64 URIs
* vue: front-end framework
* vue-i18n: internationalization plugin for Vue.js
* vue-router: Vue.js page router
* vuex: state management for Vue.js
### Development dependencies
* vue/cli-plugin-babel: babel plugin for vue-cli
* vue/cli-plugin-eslint: eslint plugin for vue-cli
* vue/cli-service: local service for vue-cli projects
* babel-core: Babel compiler
* babel-eslint: Babel linter
* eslint: AST-based pattern checker for JavaScript.
* eslint-plugin-vue: official ESLint plugin for Vue.js
* sass-loader: Sass loader for webpack
* @mapbox/stylelint-processor-arbitrary-tags: allows you to lint CSS within arbitrary tags
* @vue/cli-plugin-router: router plugin for vue-cli
* @vue/cli-plugin-vuex: Vuex plugin for vue-cli
* @vue/compiler-sfc: compiler
* copy-webpack-plugin: copies individual files or entire directories
* eslint-loader: linter
* eslint-plugin-import: linting of ES2015+ (ES6+)
* eslint-plugin-node: additional ESLint's rules for Node.js
* eslint-plugin-promise: enforce best practices for JavaScript promises
* eslint-plugin-vue-i18n: ESLint plugin for Vue I18n
* mitt: event emitter
* node-sass: wrapper around libsass
* responsive-loader: webpack loader for responsive images
* sharp: high performance Node.js image processing
* stylelint: linter
* stylelint-declaration-strict-value: stylelint plugin that enforces either variables
* stylelint-scss: a collection of SCSS specific rules for stylelint
* stylelint-webpack-plugin: stylelint plugin for webpack
* unused-webpack-plugin: webpack plugin to find unused modules/source files
* webpack-bundle-analyzer: webpack plugin and CLI utility that represents bundle content as convenient interactive zoomable treemap
## Directory structure
* public: high-level project assets
* src: Vue.js source code
   * assets: assets for the front-end design
   * components: components from which the frontend is comprised
   * directives: custom directive
   * layouts: page layouts
   * navigations: navigational sections of the website
   * plugins: additional plugins
   * routes: Vue.js routing to navigate through pages
   * views: individual pages of the website
   * vuex: state components
## Starting a development environment
### Prerequisites
* [NodeJS and npm](https://nodejs.org/en/download/)
* Vue.js

`npm install vue`

* [LiV_Backend](https://github.com/LedgerProject/LiV_backend)
### Configure the environment
Clone the repository:

`git clone https://github.com/LedgerProject/LiV_frontend.git`

`cd LiV_frontend`

Install dependencies:

`yarn install`

Build the app:

`yarn build`
