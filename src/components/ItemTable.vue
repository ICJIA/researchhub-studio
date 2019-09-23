<template>
  <div>
    <v-row justify="end">
      <v-col cols="6" lg="4">
        <v-text-field
          v-model="search"
          :append-icon="$options.static.mdiMagnify"
          hide-details
          label="Search"
          single-line
          width="300"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-data-table
      v-if="items"
      class="item-table"
      :headers="$options.static.headers"
      :items="items"
      :search="search"
      sort-by="date"
      :sort-desc="true"
    >
      <template #item.date="{ item }">{{ item.date.slice(0, 10) }}</template>

      <template #item.action="{ item }">
        <PreviewDialog
          :id="item._id"
          :content-type="contentType"
          :icon="true"
          :status="status"
        >
          <v-btn icon @click="dispatchAction('fetchItem', { id: item._id })">
            <v-icon>{{ $options.static.mdiEye }}</v-icon>
          </v-btn>
        </PreviewDialog>

        <template v-if="type === 'manage'">
          <template v-if="isStatusPublished && !isRoleAuthor">
            <v-btn icon @click="updateToSubmitted(item)">
              <v-icon>{{ $options.static.mdiClose }}</v-icon>
            </v-btn>
          </template>

          <template v-if="isStatusSubmitted">
            <v-btn icon @click="updateToPublished(item)">
              <v-icon>{{ $options.static.mdiCheck }}</v-icon>
            </v-btn>
            <v-btn icon @click="updateToCreated(item)">
              <v-icon>{{ $options.static.mdiClose }}</v-icon>
            </v-btn>
          </template>

          <template v-if="isStatusCreated">
            <v-btn icon @click="updateToSubmitted(item)">
              <v-icon>{{ $options.static.mdiCheck }}</v-icon>
            </v-btn>
            <v-btn color="error" icon @click="deleteItem(item)">
              <v-icon>{{ $options.static.mdiDeleteForever }}</v-icon>
            </v-btn>
          </template>
        </template>

        <v-btn v-if="type === 'update'" icon @click="editItem(item)">
          <v-icon>{{ $options.static.mdiPencil }}</v-icon>
        </v-btn>
      </template>

      <template #no-results>{{ msgNoResult }}</template>

      <template #no-data>{{ msgNoData }}</template>
    </v-data-table>
  </div>
</template>

<script>
import {
  mdiCheck,
  mdiClose,
  mdiDeleteForever,
  mdiEye,
  mdiMagnify,
  mdiPencil
} from '@mdi/js'

const PreviewDialog = () => import('@/components/PreviewDialog')

export default {
  components: {
    PreviewDialog
  },
  props: {
    contentType: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      search: ''
    }
  },
  computed: {
    items() {
      const items = this.$store.state.content.itemlist

      return this.contentType === 'datasets'
        ? this.filterDatasets(items, this.$store.state.auth.role)
        : items
    },
    isRoleAuthor() {
      return this.$store.state.auth.role === 'Author'
    },
    isStatusCreated() {
      return this.status === 'created'
    },
    isStatusPublished() {
      return this.status === 'published'
    },
    isStatusSubmitted() {
      return this.status === 'submitted'
    },
    msgNoResult() {
      return `Your search for "${this.search}" found no results.`
    },
    msgNoData() {
      return this.loading
        ? `Loading "${this.status}" items...`
        : `No "${this.status}" items.`
    }
  },
  watch: {
    contentType() {
      this.loadItemList()
    },
    status() {
      this.loadItemList()
    }
  },
  created() {
    this.loadItemList()
  },
  methods: {
    async dispatchAction(action, params) {
      return await this.$store.dispatch(`content/${action}`, {
        contentType: this.contentType,
        ...params
      })
    },
    filterDatasets(datasets, role) {
      switch (role) {
        case 'Administrator':
          return datasets
        case 'Author':
          return datasets.filter(el => el.project)
        case 'Data Manager':
          return datasets.filter(el => !el.project)
      }
    },
    async loadItemList() {
      this.loading = true
      await this.dispatchAction('clearAll')
      await this.dispatchAction('fetchItemList', { status: this.status })
      this.loading = false
    },
    handleUpdate(res, msgSuccess, msgFailure, callback = this.loadItemList) {
      if (res && res.status === 200) {
        alert(`✔️${msgSuccess}`)
        callback()
      } else {
        alert(`⚠️${msgFailure}`)
      }
    },
    async editItem({ _id: id, title }) {
      const res = await this.dispatchAction('fetchItem', { id })
      if (res && res.status === 200) {
        alert('✔️Item is selected. Click the next button (>) to edit.')
      } else {
        alert(`⚠️Failed to select: ${title}`)
      }
    },
    async deleteItem({ _id: id, title }) {
      if (confirm('Deleting an item cannot be undone. Are you sure?')) {
        const res = await this.dispatchAction('deleteItem', { id })
        const msgSuccess = 'Item is deleted.'
        const msgFailure = `Failed to delete: ${title}`

        this.handleUpdate(res, msgSuccess, msgFailure)
      }
    },
    async triggerBuildMain(contentType) {
      const buildHookUrl = process.env.VUE_APP_MAIN_BUILD_HOOK
      const triggerTitle = `Deploy+triggered+by+hook:+New+${contentType}+item+published`

      fetch(`${buildHookUrl}?trigger_title=${triggerTitle}`, { method: 'POST' })
    },
    async updateToCreated({ _id: id, title }) {
      const res = await this.dispatchAction('updateItemToCreated', { id })
      const msgSuccess = `Status updated to "created": ${title}`
      const msgFailure = `Failed to update status: ${title}`

      this.handleUpdate(res, msgSuccess, msgFailure)
    },
    async updateToPublished({ _id: id, title, slug }) {
      const res = await this.dispatchAction('updateItemToPublished', { id })
      const baseURL = process.env.VUE_APP_MAIN_BASE_URL
      const msgSuccess =
        `Status updated to "published": ${title}\n\n` +
        `Public link: ${baseURL}/${this.contentType}/${slug}`
      const msgFailure = `Failed to update status: ${title}`

      this.handleUpdate(res, msgSuccess, msgFailure, () => {
        if (this.contentType !== 'datasets')
          this.triggerBuildMain(this.contentType)
        this.loadItemList()
      })
    },
    async updateToSubmitted({ _id: id, title, slug }) {
      const res = await this.dispatchAction('updateItemToSubmitted', { id })
      const baseURL = process.env.VUE_APP_MAIN_BASE_URL
      const msgSuccess =
        `Status updated to "submitted": ${title}\n\n` +
        `Preview link: ${baseURL}/preview/${this.contentType}/${slug}`
      const msgFailure = `Failed to update status: ${title}`

      this.handleUpdate(res, msgSuccess, msgFailure)
    }
  },
  static: {
    headers: [
      {
        text: 'Date',
        align: 'left',
        value: 'date'
      },
      {
        text: 'Title',
        align: 'left',
        value: 'title'
      },
      {
        text: 'Actions',
        align: 'right',
        value: 'action',
        sortable: false
      }
    ],
    mdiCheck,
    mdiClose,
    mdiDeleteForever,
    mdiEye,
    mdiMagnify,
    mdiPencil
  }
}
</script>

<style scoped>
.item-table >>> td {
  font-size: 0.95em;
}
</style>
