<template>
  <v-row>
    <v-col class="px-4" cols="10" sm="8" lg="4">
      <v-checkbox
        v-model="item.project"
        label="Project data?"
        :disabled="!isAdmin"
      />
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="4">
      <v-textarea
        v-model="item.sourceString"
        label="Sources"
        hint="Format: title | url; Separate sources with new lines"
        rows="3"
        auto-grow
        :rules="[rules.required]"
      />
    </v-col>

    <v-col cols="12">
      <v-row>
        <v-col class="px-4" cols="10" sm="8" lg="4">
          <v-text-field
            v-model="item.timeperiodString"
            label="Time period"
            hint="Format: yyyy-yyyy"
            :rules="[rules.timeperiod]"
          />
        </v-col>

        <v-col class="px-4" cols="10" sm="8" lg="4">
          <v-select
            v-model="item.timeperiodType"
            label="Time period type"
            clearable
            :items="timeperiodOptions"
          />
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12">
      <v-col class="px-4" cols="10" sm="8" lg="4">
        <v-select
          v-model="item.unit"
          label="Unit"
          clearable
          :items="unitOptions"
        />
      </v-col>
    </v-col>

    <v-col v-if="update" class="px-4 pt-4" cols="10" sm="8">
      <slot name="datafile"></slot>
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="5">
      <v-textarea
        v-model="item.description"
        label="Description"
        auto-grow
        :rules="[rules.required]"
      />
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="5">
      <v-textarea
        v-model="item.noteString"
        label="Notes"
        hint="Separate notes with new lines"
        auto-grow
      />
    </v-col>

    <v-col class="px-4" cols="10" sm="8" lg="5">
      <v-textarea
        v-model="item.variableString"
        label="Variables"
        hint="Format: name | type | definition | values; Separate rows with new lines"
        auto-grow
        :rules="[rules.required]"
      />
    </v-col>
  </v-row>
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
      isAdmin: this.$store.state.auth.role === 'Administrator',
      timeperiodOptions,
      unitOptions
    }
  },
  created() {
    this.item.project = this.$store.state.auth.role === 'Authenticated'
  }
}
</script>
