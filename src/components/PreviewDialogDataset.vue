<template>
  <v-col class="mx-auto mt-6 px-0" cols="12" sm="10" lg="8" xl="7">
    <DatasetView
      v-if="view"
      :item="item"
      :downloader="nodownloader"
      :preview="true"
    />

    <v-col v-else cols="12" lg="6">
      <DatasetCard :item="item" :preview="true" />
    </v-col>
  </v-col>
</template>

<script>
const DatasetCard = () => import('icjia-research-lib').then(m => m.DatasetCard)
const DatasetView = () => import('icjia-research-lib').then(m => m.DatasetView)

export default {
  components: {
    DatasetCard,
    DatasetView
  },
  props: {
    item: Object,
    view: Boolean
  },
  methods: {
    nodownloader() {
      alert('⚠️Cannot download files in preview!')
    }
  }
}
</script>
