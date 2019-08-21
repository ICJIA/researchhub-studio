import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from '@/store/modules/auth'
import * as content from '@/store/modules/content'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    content
  }
})

export default store
