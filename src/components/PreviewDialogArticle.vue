<template>
  <div>
    <RHArticleView
      id="article-view"
      v-if="view"
      :item="item"
      :downloader="nodownloader"
      :preview="true"
    />

    <v-col v-else class="mx-auto mt-6 px-0" cols="12" sm="10" lg="8" xl="7">
      <RHArticleCard :item="item" :preview="true" />
    </v-col>
  </div>
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
      alert('⚠️Cannot download files in preview!')
    }
  }
}
</script>

<style scoped>
#article-view {
  font-family: 'Gentium Book Basic', serif;
}
</style>
