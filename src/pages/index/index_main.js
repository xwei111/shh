// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './Index'
import router from './router'
import flexible from 'amfe-flexible'
import 'normalize.css/normalize.css';
import '@/assets/base.css'
Vue.config.productionTip = false
Vue.use(flexible)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
})
