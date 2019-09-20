<template>
  <v-row>
    <v-col class="px-4" cols="10" sm="8" lg="4">
      <v-checkbox
        v-model="item.project"
        :disabled="!isAdmin"
        label="Project data?"
      />
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="4">
      <v-textarea
        v-model="item.sourceString"
        auto-grow
        hint="Format: title | url; Separate sources with new lines"
        label="Sources"
        rows="3"
        :rules="[rules.required]"
      />
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col class="px-4" cols="10" sm="8" lg="4">
          <v-text-field
            v-model="item.timeperiodString"
            hint="Format: yyyy-yyyy"
            label="Time period"
            :rules="[rules.timeperiod]"
          />
        </v-col>

        <v-col class="px-4" cols="10" sm="8" lg="4">
          <v-select
            v-model="item.timeperiodType"
            clearable
            :items="$options.static.timeperiodOptions"
            label="Time period type"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" class="px-0">
      <v-col class="px-4" cols="10" sm="8" lg="4">
        <v-select
          v-model="item.unit"
          clearable
          :items="$options.static.unitOptions"
          label="Unit"
        />
      </v-col>
    </v-col>

    <v-col v-if="update" class="px-4 pt-4" cols="10" sm="8">
      <slot name="datafile"></slot>
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="5">
      <v-textarea
        v-model="item.description"
        auto-grow
        label="Description"
        :rules="[rules.required]"
      />
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="5">
      <v-textarea
        v-model="item.noteString"
        auto-grow
        hint="Separate notes with new lines"
        label="Notes"
      />
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="5">
      <v-textarea
        v-model="item.variableString"
        auto-grow
        hint="Format: name | type | definition | values; Separate rows with new lines"
        label="Variables"
        :rules="[rules.required]"
      />
    </v-col>
  </v-row>
</template>

<script>
import { timeperiodOptions, unitOptions } from '@/consts/fieldOptions'

export default {
  model: {
    prop: 'item',
    event: 'change'
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    rules: {
      type: Object,
      default: null
    },
    update: Boolean
  },
  data() {
    return {
      isAdmin: this.$store.state.auth.role === 'Administrator'
    }
  },
  created() {
    this.item.project = this.$store.state.auth.role === 'Author'
  },
  static: {
    timeperiodOptions,
    unitOptions
  }
}
</script>
