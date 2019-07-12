<template>
  <v-card>
    <v-card-title>
      <p class="font-lato bold large">
        <template>{{ 'Content type: ' }}</template>
        <span class="capitalize">{{ contentType }}</span>
      </p>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table
      v-if="items"
      class="item-table"
      :headers="contentType !== 'authors' ? headers : headersAuthor"
      :items="items"
      :search="search"
      :pagination.sync="paginationSync"
    >
      <template slot="items" slot-scope="props">
        <td v-if="contentType !== 'authors' && props.item.date">
          <template>{{ props.item.date.slice(0, 10) }}</template>
        </td>

        <td>{{ props.item.title }}</td>

        <td class="justify-end layout px-3">
          <PreviewDialog
            v-if="contentType !== 'authors'"
            :contentType="contentType"
            :icon="true"
            :id="props.item._id"
            :status="status"
          >
            <v-icon
              class="greyicon"
              @click="dispatchAction('fetchItem', { id: props.item._id })"
            >
              <template>{{ 'visibility' }}</template>
            </v-icon>
          </PreviewDialog>

          <template v-if="type === 'manage'">
            <template v-if="isStatusPublished">
              <v-btn icon @click="updateToSubmitted(props.item)">
                <v-icon class="greyicon">close</v-icon>
              </v-btn>
            </template>

            <template v-if="isStatusSubmitted">
              <v-btn icon @click="updateToPublished(props.item)">
                <v-icon class="greyicon">check</v-icon>
              </v-btn>
              <v-btn icon @click="updateToCreated(props.item)">
                <v-icon class="greyicon">close</v-icon>
              </v-btn>
            </template>

            <template v-if="isStatusCreated">
              <v-btn icon @click="updateToSubmitted(props.item)">
                <v-icon class="greyicon">check</v-icon>
              </v-btn>

              <v-btn icon @click="deleteItem(props.item)">
                <v-icon color="error">delete_forever</v-icon>
              </v-btn>
            </template>
          </template>

          <v-btn v-if="type === 'update'" icon @click="editItem(props.item)">
            <v-icon class="greyicon">edit</v-icon>
          </v-btn>
        </td>
      </template>

      <div slot="no-results" style="text-align:center;">
        <template>{{ msgNoResult }}</template>
      </div>

      <div v-if="loading" slot="no-data" style="text-align:center;">
        <template>{{ msgLoading }}</template>
      </div>
    </v-data-table>
  </v-card>
</template>

<script>
const PreviewDialog = () => import('@/components/PreviewDialog')

export default {
  components: {
    PreviewDialog
  },
  props: {
    contentType: String,
    status: String,
    type: String
  },
  data() {
    return {
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
          value: 'title',
          sortable: false
        }
      ],
      paginationSync: {
        descending: true,
        sortBy: 'date'
      },
      loading: false,
      search: ''
    }
  },
  computed: {
    items() {
      return this.$store.state.content.itemlist
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
    headersAuthor() {
      return this.headers.filter(el => el.value !== 'date')
    },
    msgNoResult() {
      return `Your search for "${this.search}" found no results.`
    },
    msgLoading() {
      return `Loading "${this.status}" items...`
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
    async loadItemList() {
      this.loading = true
      await this.dispatchAction('clearAll')
      await this.dispatchAction('fetchItemList', { status: this.status })
      this.loading = false
    },
    handleUpdate(res, msgSuccess, msgFailure) {
      if (res && res.status === 200) {
        alert(msgSuccess)
        this.loadItemList()
      } else {
        alert(msgFailure)
      }
    },
    async editItem({ _id: id, title }) {
      const res = await this.dispatchAction('fetchItem', { id })
      if (res && res.status === 200) {
        alert('Item is selected. Proceed to edit.')
      } else {
        alert(`Failed to select: ${title}`)
      }
    },
    async deleteItem({ _id: id, title }) {
      const res = await this.dispatchAction('deleteItem', { id })
      const msgSuccess = 'Item is deleted.'
      const msgFailure = `Failed to delete: ${title}`

      this.handleUpdate(res, msgSuccess, msgFailure)
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

      this.handleUpdate(res, msgSuccess, msgFailure)
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
  }
}
</script>

<style scoped>
.item-table >>> td {
  font-size: 1em;
}

.greyicon {
  color: rgba(0, 0, 0, 0.54) !important;
}
</style>
