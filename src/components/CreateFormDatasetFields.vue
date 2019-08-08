<template>
  <v-layout row wrap>
    <v-flex class="px-3" xs10 sm8 lg4>
      <v-textarea
        v-model="item.sourceString"
        label="Sources"
        hint="Format: title | url; separate sources with new lines"
        rows="3"
        auto-grow
        :rules="[rules.required]"
      />
    </v-flex>

    <v-flex xs12>
      <v-layout row wrap>
        <v-flex class="px-3" xs10 sm8 lg4>
          <v-text-field
            v-model="item.timeperiodString"
            label="Time period"
            hint="Format: yyyy-yyyy"
            :rules="[rules.timeperiod]"
          />
        </v-flex>

        <v-flex class="px-3" xs10 sm8 lg4>
          <v-select
            v-model="item.timeperiodType"
            label="Time period type"
            clearable
            :items="timeperiodOptions"
          />
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs12>
      <v-flex class="px-3" xs10 sm8 lg4>
        <v-select
          v-model="item.unit"
          label="Unit"
          clearable
          :items="unitOptions"
        />
      </v-flex>
    </v-flex>

    <v-flex v-if="update" class="px-3 pt-3" xs10 sm8>
      <slot name="datafile"></slot>
    </v-flex>

    <v-flex class="px-3" xs10 sm8 lg5>
      <v-textarea
        v-model="item.description"
        label="Description"
        auto-grow
        :rules="[rules.required]"
      />
    </v-flex>

    <v-flex class="px-3" xs10 sm8 lg5>
      <v-textarea
        v-model="item.noteString"
        label="Notes"
        hint="Separate notes with new lines"
        auto-grow
      />
    </v-flex>

    <v-flex class="px-3" xs10 sm8 lg5>
      <v-textarea
        v-model="item.variableString"
        label="Variables"
        hint="Format: name | type | definition | values; separate rows with new lines"
        auto-grow
        :rules="[rules.required]"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import { timeperiodOptions, unitOptions } from '@/consts/fieldOptions'

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
      description: null,
      noteString: null,
      sourceString: null,
      timeperiodOptions,
      timeperiodString: null,
      timeperiodType: null,
      variableString: null,
      unit: null,
      unitOptions
    }
  }
}
</script>
