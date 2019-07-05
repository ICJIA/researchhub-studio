import Vue from 'vue'
import Vuex from 'vuex'

import * as auth from '@/store/modules/auth'
import * as content from '@/store/modules/content'
import * as form from '@/store/modules/form'
import * as task from '@/store/modules/task'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    content,
    form,
    task
  }
})

export default store
