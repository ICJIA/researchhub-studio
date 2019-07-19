<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <v-btn slot="activator" :outline="!icon" :icon="icon">
      <slot>Preview</slot>
    </v-btn>

    <v-card>
      <v-toolbar class="toolbar">
        <v-btn icon @click="closePreview">
          <v-icon>close</v-icon>
        </v-btn>

        <v-btn flat @click="view = !view">
          <template>{{ view ? 'show card' : 'show view' }}</template>
        </v-btn>

        <v-toolbar-title style="text-transform: uppercase">
          <template>{{ msgTitle }}</template>
        </v-toolbar-title>

        <template v-if="status !== 'created'">
          <v-spacer />

          <v-btn color="primary" flat :href="link" target="_blank">
            {{ status === 'published' ? 'public link' : 'preview link' }}
          </v-btn>
        </template>
      </v-toolbar>

      <template v-if="item">
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
import { fetchItemById as fetchAppById } from '@/services/client.apps.js'
import { fetchItemById as fetchArticleById } from '@/services/client.articles.js'
import { fetchItemById as fetchDatasetById } from '@/services/client.datasets.js'

const PreviewDialogApp = () => import('@/components/PreviewDialogApp')
const PreviewDialogArticle = () => import('@/components/PreviewDialogArticle')
const PreviewDialogDataset = () => import('@/components/PreviewDialogDataset')

export default {
  components: {
    PreviewDialogApp,
    PreviewDialogArticle,
    PreviewDialogDataset
  },
  props: {
    contentType: String,
    icon: Boolean,
    id: String,
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
      view: false,
      item: this.local ? this.$store.state.content.item : null,
      published: this.status === 'published'
    }
  },
  computed: {
    msgTitle() {
      return `Preview type: ${this.contentType} ${this.view ? 'view' : ''}`
    },
    link() {
      if (status !== 'created' && this.item) {
        return (
          `${process.env.VUE_APP_MAIN_BASE_URL}/` +
          (this.status === 'published' ? '' : 'preview/') +
          `${this.contentType}/${this.item.slug}`
        )
      } else {
        return ''
      }
    }
  },
  methods: {
    closePreview() {
      this.dialog = false
      this.view = false
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
  watch: {
    async id() {
      if (!this.local) await this.reload()
    }
  },
  async created() {
    if (!this.local) await this.reload()
  }
}
</script>

<style scoped>
.toolbar {
  font-family: 'Lato' !important;
  box-shadow: 0 2px rgba(0, 0, 0, 0.2);
}
</style>
