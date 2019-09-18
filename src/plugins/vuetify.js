import Vue from 'vue'
import Vuetify, {
  VAppBar,
  VFooter,
  VNavigationDrawer,
  VSpacer
} from 'vuetify/lib'
import { ResearchHubLibIcons } from 'icjia-research-lib'

Vue.use(Vuetify, {
  components: {
    VAppBar,
    VFooter,
    VNavigationDrawer,
    VSpacer
  }
})

export default new Vuetify({
  theme: { disable: true },
  icons: {
    iconfont: 'mdiSvg',
    values: { ...ResearchHubLibIcons }
  }
})
