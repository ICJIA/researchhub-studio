<template>
  <div>
    <ArticleView
      id="article-view"
      v-if="view"
      :item="item"
      :downloader="nodownloader"
      :preview="true"
    />

    <v-col v-else class="mx-auto mt-6 px-0" cols="12" sm="10" lg="8" xl="7">
      <ArticleCard :item="item" :preview="true" />
    </v-col>
  </div>
</template>

<script>
export default {
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
