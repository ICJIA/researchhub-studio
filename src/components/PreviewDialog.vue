<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template #activator="{ on }">
      <v-btn class="mx-2" :icon="icon" :outlined="!icon" v-on="on">
        <slot>Preview</slot>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar class="toolbar">
        <span class="px-4 text-uppercase wide">{{ msgTitle }}</span>

        <v-spacer></v-spacer>

        <template v-if="status !== 'created'">
          <v-btn class="mx-1" color="primary" text :href="link" target="_blank">
            {{ status === 'published' ? 'public link' : 'preview link' }}
          </v-btn>
        </template>

        <v-btn class="mx-1" text @click="view = !view">
          <template>{{ view ? 'show card' : 'show view' }}</template>
        </v-btn>

        <v-btn class="mx-1" icon @click="closePreview">
          <v-icon>{{ $options.static.mdiClose }}</v-icon>
        </v-btn>
      </v-toolbar>

      <BaseViewTitle page="Item preview" />

      <template v-if="dialog && item">
        <PreviewDialogApp
          v-if="contentType === 'apps'"
          :item="item"
          :view="view"
        />

        <PreviewDialogArticle
          v-if="contentType === 'articles'"
          :item="item"
          :view="view"
        />

        <PreviewDialogDataset
          v-if="contentType === 'datasets'"
          :item="item"
          :view="view"
        />
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js'
import { main } from '@/config'
import { fetchItemById as fetchAppById } from '@/services/client.apps'
import { fetchItemById as fetchArticleById } from '@/services/client.articles'
import { fetchItemById as fetchDatasetById } from '@/services/client.datasets'

const BaseViewTitle = () => import('@/components/BaseViewTitle')
const PreviewDialogApp = () => import('@/components/PreviewDialogApp')
const PreviewDialogArticle = () => import('@/components/PreviewDialogArticle')
const PreviewDialogDataset = () => import('@/components/PreviewDialogDataset')

export default {
  components: {
    BaseViewTitle,
    PreviewDialogApp,
    PreviewDialogArticle,
    PreviewDialogDataset
  },
  props: {
    contentType: {
      type: String,
      default: ''
    },
    icon: Boolean,
    id: {
      type: String,
      default: ''
    },
    local: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialog: false,
      view: true,
      item: this.local ? this.$store.state.content.item : null,
      published: this.status === 'published',
      mdiClose
    }
  },
  computed: {
    msgTitle() {
      return `Preview type: ${this.contentType} ${this.view ? 'view' : 'card'}`
    },
    link() {
      if (status !== 'created' && this.item) {
        return (
          main.baseURL +
          (this.status === 'published' ? '/' : '/preview/') +
          `${this.contentType}/${this.item.slug}`
        )
      } else {
        return ''
      }
    }
  },
  watch: {
    async id() {
      if (!this.local) await this.reload()
    }
  },
  async created() {
    if (!this.local) await this.reload()
  },
  methods: {
    closePreview() {
      this.dialog = false
      this.view = true
    },
    async reload() {
      switch (this.contentType) {
        case 'apps':
          this.item = (await fetchAppById(this.id)).data
          break
        case 'articles':
          this.item = (await fetchArticleById(this.id)).data
          break
        case 'datasets':
          this.item = (await fetchDatasetById(this.id)).data
      }
    }
  },
  static: {
    mdiClose
  }
}
</script>

<style scoped>
.toolbar {
  font-family: 'Lato' !important;
  box-shadow: 0 1px rgba(0, 0, 0, 0.2);
  height: 60px;
}
</style>
