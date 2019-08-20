import Vue from 'vue'
import vuetify from './plugins/vuetify'

import ResearchHubLib from 'icjia-research-lib'
import 'icjia-research-lib/style.css'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(ResearchHubLib)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
