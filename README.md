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
* axios: promise based HTTP client
* lodash: Lodash modular utilities
* vue: front-end framework
* vue-i18n: internationalization plugin for Vue.js
* vue-router: Vue.js page router
* vuelidate: model-based validation for Vue.js
* vuex: state management for Vue.js
### Development dependencies
* vue/cli-plugin-babel: babel plugin for vue-cli
* vue/cli-plugin-eslint: eslint plugin for vue-cli
* vue/cli-service: local service for vue-cli projects
* vue/eslint-config-standard: standard linter config for Vue.js
* vue/test-utils: utilities for testing Vue components.
* babel-core: Babel compiler
* babel-eslint: Babel linter
* eslint: AST-based pattern checker for JavaScript.
* eslint-config-prettier: turns off all rules that are unnecessary or might conflict with Prettier
* eslint-config-vuetify: Eslint config for vue.js projects
* eslint-plugin-prettier: runs prettier as an eslint rule
* eslint-plugin-vue: official ESLint plugin for Vue.js
* prettier: opinionated code formatter
* resolve-url-loader: Webpack loader that resolves relative paths in url() statements based on the original source file
* sass: JavaScript implementation of Sass
* sass-loader: Sass loader for webpack
* vue-cli-plugin-i18n: Vue CLI plugin to add vue-i18n
* vue-cli-plugin-vuetify: Vuetify Framework Plugin for Vue CLI 3
* vue-template-compiler: template compiler for Vue 2.0
* vuetify-loader: a Webpack plugin for treeshaking Vuetify components and more
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
