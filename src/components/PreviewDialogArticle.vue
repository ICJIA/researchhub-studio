<template>
  <div>
    <ArticleView
      v-if="view"
      id="article-view"
      :downloader="nodownloader"
      :item="item"
      :preview="true"
    />

    <v-col v-else class="mx-auto mt-6 px-0" cols="12" sm="10" lg="8" xl="7">
      <ArticleCard
        :horizontal="$vuetify.breakpoint.smAndUp"
        :item="item"
        :preview="true"
      />
    </v-col>
  </div>
</template>

<script>
const ArticleCard = () => import('researchhub-lib').then(m => m.ArticleCard)
const ArticleView = () => import('researchhub-lib').then(m => m.ArticleView)

export default {
  components: {
    ArticleCard,
    ArticleView
  },
  props: {
    item: {
      type: Object,
      default: null
    },
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
