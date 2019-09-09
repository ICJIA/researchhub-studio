<template>
  <v-row>
    <v-col class="pl-1 pr-4" cols="10" sm="8" lg="5">
      <v-row no-gutters>
        <v-col class="shrink">
          <CreateFormExistingAuthors @useExistingAuthors="useExistingAuthors" />
        </v-col>
        <v-col>
          <v-textarea
            v-model="item.authorString"
            label="Authors"
            auto-grow
            hint="Format: full name | brief description; Separate authors with new lines"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="5">
      <v-textarea
        v-model="item.abstract"
        label="Abstract"
        auto-grow
        :rules="[rules.required]"
      />
    </v-col>

    <template v-if="update">
      <v-col class="px-4" cols="5">
        <p class="pt-2 greycolor">Attach files?</p>
        <v-checkbox
          v-model="hasFiles"
          :label="hasFiles ? 'Yes' : 'No'"
        ></v-checkbox>
      </v-col>

      <v-col v-show="hasFiles" class="px-4" cols="10" sm="8" lg="5">
        <p class="pt-2 greycolor">Main file type</p>
        <v-radio-group v-model="item.mainfiletype" row>
          <v-radio
            v-for="option in mainfiletypeOptions"
            :key="option"
            :label="option"
            :value="option"
          ></v-radio>
        </v-radio-group>
      </v-col>

      <v-col v-show="hasFiles" cols="12">
        <v-row>
          <v-col class="px-4 pt-4" cols="10" sm="8" lg="5">
            <slot name="mainfile"></slot>
          </v-col>

          <v-col class="px-4 pt-4" cols="10" sm="8" lg="5">
            <slot name="extrafile"></slot>
          </v-col>
        </v-row>
      </v-col>
    </template>

    <v-col cols="12">
      <v-row>
        <v-col class="px-4 pt-4" cols="10" sm="8" lg="5">
          <slot name="splash"></slot>
        </v-col>

        <v-col class="px-4 pt-4" cols="10" sm="8" lg="5">
          <slot name="figures"></slot>
        </v-col>
      </v-row>
    </v-col>

    <v-col class="px-4 pt-4" cols="10" sm="8" lg="10">
      <p class="pt-2 greycolor">Article body</p>
      <slot name="articlebody"></slot>
    </v-col>
  </v-row>
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
      hasFiles: this.mainfiletype !== null,
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
