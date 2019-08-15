<template>
  <v-col class="mx-auto mt-6 px-0" cols="12" sm="10" lg="8" xl="7">
    <RHDatasetView
      v-if="view"
      :item="item"
      :downloader="nodownloader"
      :preview="true"
    />

    <v-col v-else cols="12" lg="6">
      <RHDatasetCard :item="item" :preview="true" />
    </v-col>
  </v-col>
</template>

<script>
const RHDatasetCard = () =>
  import('icjia-research-lib/lib/cjs').then(lib => lib.DatasetCard)
const RHDatasetView = () =>
  import('icjia-research-lib/lib/cjs').then(lib => lib.DatasetView)

export default {
  components: {
    RHDatasetCard,
    RHDatasetView
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
