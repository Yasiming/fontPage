import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/base.css'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

import 'normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
