import Vue from 'vue'
import Vuetify, {
  VAppBar,
  VFooter,
  VNavigationDrawer,
  VSpacer
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VAppBar,
    VFooter,
    VNavigationDrawer,
    VSpacer
  }
})

export default new Vuetify({
  theme: { disable: true }
})
