<template>
  <v-container>
    <RHArticleView v-if="view" :item="item" :downloader="nodownloader" />

    <v-layout v-else justify-center>
      <v-flex xs12 sm10 xl8>
        <RHArticleCard :item="item" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const RHArticleCard = () =>
  import('icjia-research-lib/lib/cjs').then(lib => lib.ArticleCard)
const RHArticleView = () =>
  import('icjia-research-lib/lib/cjs').then(lib => lib.ArticleView)

export default {
  components: {
    RHArticleCard,
    RHArticleView
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
