import Vue from 'vue'
import Vuetify, { VAppBar, VNavigationDrawer, VSpacer } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VAppBar,
    VNavigationDrawer,
    VSpacer
  }
})

export default new Vuetify({
  theme: { disable: true }
})
