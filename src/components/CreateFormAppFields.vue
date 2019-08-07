<template>
  <v-layout row wrap>
    <v-flex class="px-3" xs12 md6 lg4>
      <v-text-field v-model="item.url" label="URL" :rules="[rules.required]" />
    </v-flex>

    <v-flex xs12>
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-select
            v-model="item.articles"
            item-text="title"
            label="Related articles"
            clearable
            multiple
            return-object
            :items="articleOptions"
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-select
            v-model="item.datasets"
            item-text="title"
            label="Related datasets"
            clearable
            multiple
            return-object
            :items="datasetOptions"
          />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex class="px-3 pt-3" xs12>
      <slot name="image"></slot>
    </v-flex>

    <v-flex class="px-3" xs12 md10 lg6>
      <v-textarea
        v-model="item.description"
        label="Description"
        auto-grow
        :rules="[rules.required]"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { fetchItemsList as fetchArticlesList } from '@/services/client.articles'
import { fetchItemsList as fetchDatasetsList } from '@/services/client.datasets'

export default {
  props: {
    item: Object,
    rules: Object
  },
  model: {
    prop: 'item',
    event: 'change'
  },
  data() {
    return {
      description: null,
      url: null,
      articles: null,
      articleOptions: [],
      datasets: null,
      datasetOptions: []
    }
  },
  async created() {
    this.articleOptions = (await fetchArticlesList('published')).data
    this.datasetOptions = (await fetchDatasetsList('published')).data
  }
}
</script>
