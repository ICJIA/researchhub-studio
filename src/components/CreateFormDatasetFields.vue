<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.sourceTitleString"
            label="Sources"
            hint="Separate sources with commas"
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.sourceUrlString"
            label="Source URLs"
            hint="Separate URLs with commas"
          />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12>
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.timeperiodString"
            label="Time period"
            hint="Format: yyyy-yyyy"
            :rules="[rules.timeperiod]"
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-select
            v-model="item.timeperiodType"
            label="Time period type"
            clearable
            :items="timeperiodOptions"
          />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex class="px-3" xs12 md6 lg4>
      <v-select
        v-model="item.unit"
        label="Unit"
        clearable
        :items="unitOptions"
      />
    </v-flex>

    <v-flex xs12>
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-select
            v-model="item.apps"
            item-text="title"
            label="Related apps"
            clearable
            multiple
            return-object
            :items="appOptions"
          />
        </v-flex>

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
      </v-layout>
    </v-flex>

    <v-flex v-if="update" class="px-3 pt-3" xs12>
      <slot name="datafile"></slot>
    </v-flex>

    <v-flex class="px-3" xs12 md10 lg6>
      <v-textarea
        v-model="item.description"
        label="Description"
        no-resize
        :rules="[rules.required]"
      />
    </v-flex>

    <v-flex class="px-3" xs12 md10 lg6>
      <v-textarea
        v-model="item.noteString"
        label="Notes"
        hint="Separate notes with new lines"
        no-resize
      />
    </v-flex>

    <v-flex class="px-3" xs12 md10 lg6>
      <v-textarea
        v-model="item.variableString"
        label="Variables"
        hint="Format: name | type | definition | values; separate rows with new lines"
        no-resize
        :rules="[rules.required]"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { timeperiodOptions, unitOptions } from '@/consts/fieldOptions'
import { fetchItemsList as fetchAppsList } from '@/services/client.apps'
import { fetchItemsList as fetchArticlesList } from '@/services/client.articles'

export default {
  props: {
    item: Object,
    rules: Object,
    update: Boolean
  },
  model: {
    prop: 'item',
    event: 'change'
  },
  data() {
    return {
      abstract: null,
      apps: null,
      appOptions: [],
      articles: null,
      articleOptions: [],
      description: null,
      sourceTitleString: null,
      sourceUrlString: null,
      noteString: null,
      timeperiodOptions,
      timeperiodString: null,
      timeperiodType: null,
      variableString: null,
      unit: null,
      unitOptions
    }
  },
  async created() {
    this.appOptions = (await fetchAppsList('published')).data
    this.articleOptions = (await fetchArticlesList('published')).data
  }
}
</script>
