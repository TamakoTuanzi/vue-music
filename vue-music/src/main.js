import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

import 'common/stylus/index.styl'
// Vue.config.productionTip = false
fastclick.attach(document.body)
/* eslint-disable no-new */
Vue.use(VueLazyLoad, {
  loading: require('common/images/default.png')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
