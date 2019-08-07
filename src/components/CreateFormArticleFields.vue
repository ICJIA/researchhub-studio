<template>
  <v-layout row wrap>
    <v-flex class="px-3" xs12 md10 lg6>
      <v-layout row wrap>
        <CreateFormExistingAuthors @useExistingAuthors="useExistingAuthors" />
        <v-textarea
          v-model="item.authorString"
          label="Authors"
          auto-grow
          hint="Format: full name | brief description; add new authors with new lines"
          :rules="[rules.required]"
        />
      </v-layout>
    </v-flex>

    <v-flex class="px-3" xs12 md10 lg6>
      <v-textarea
        v-model="item.abstract"
        label="Abstract"
        auto-grow
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
      authors: null,
      authorString: null,
      hasFiles: this.mainfiletype !== null,
      mainfiletype: null,
      mainfiletypeOptions
    }
  },
  methods: {
    useExistingAuthors(e) {
      this.$emit('useExistingAuthors', e)
    }
  }
}
</script>
