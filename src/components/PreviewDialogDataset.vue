<template>
  <v-container>
    <v-layout justify-center>
      <v-flex v-if="view" xs12 sm10 md8>
        <RHDatasetView :item="item" :downloader="nodownloader" />
      </v-flex>

      <v-flex v-else xs12 sm6 md4>
        <RHDatasetCard :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
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
      alert('Cannot download files in preview!')
    }
  }
}
</script>
