<template>
  <v-layout row wrap>
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

    <v-flex class="px-3" xs12 md10 lg6>
      <v-layout row wrap>
        <CreateFormExistingAuthors @useExistingAuthors="useExistingAuthors" />
        <v-textarea
          v-model="item.authorString"
          label="Authors"
          no-resize
          hint="Format: full name | brief description; add new authors with new lines"
          :rules="[rules.required]"
        />
      </v-layout>
    </v-flex>

    <v-flex class="px-3" xs12 md10 lg6>
      <v-textarea
        v-model="item.abstract"
        label="Abstract"
        no-resize
        :rules="[rules.required]"
      />
    </v-flex>

    <template v-if="update">
      <v-flex class="px-3" xs2>
        <p class="pt-2 greycolor">Attach files?</p>
        <v-checkbox
          v-model="hasFiles"
          :label="hasFiles ? 'Yes' : 'No'"
        ></v-checkbox>
      </v-flex>

      <v-flex v-show="hasFiles" class="px-3" xs12 md10>
        <p class="pt-2 greycolor">Main file type</p>
        <v-radio-group v-model="item.mainfiletype" row>
          <v-radio
            v-for="option in mainfiletypeOptions"
            :key="option"
            :label="option"
            :value="option"
          ></v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex v-show="hasFiles" xs12>
        <v-layout row wrap>
          <v-flex class="px-3 pt-3" xs12 md6>
            <slot name="mainfile"></slot>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12 md6>
            <slot name="extrafile"></slot>
          </v-flex>
        </v-layout>
      </v-flex>
    </template>

    <v-flex xs12>
      <v-layout row wrap>
        <v-flex class="px-3 pt-3" xs12 md6>
          <slot name="splash"></slot>
        </v-flex>

        <v-flex class="px-3 pt-3" xs12 md6>
          <slot name="figures"></slot>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex class="px-3 pt-3" xs12>
      <p class="pt-2 greycolor">Article body</p>
      <slot name="articlebody"></slot>
    </v-flex>
  </v-layout>
</template>

<script>
import { mainfiletypeOptions } from '@/consts/fieldOptions'
import { fetchItemsList as fetchAppsList } from '@/services/client.apps'
import { fetchItemsList as fetchDatasetsList } from '@/services/client.datasets'

const CreateFormExistingAuthors = () =>
  import('@/components/CreateFormExistingAuthors')

export default {
  components: {
    CreateFormExistingAuthors
  },
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
      authors: null,
      authorString: null,
      datasets: null,
      datasetOptions: [],
      hasFiles: this.mainfiletype !== null,
      mainfiletype: null,
      mainfiletypeOptions
    }
  },
  async created() {
    this.appOptions = (await fetchAppsList('published')).data
    this.datasetOptions = (await fetchDatasetsList('published')).data
  },
  methods: {
    useExistingAuthors(e) {
      this.$emit('useExistingAuthors', e)
    }
  }
}
</script>
