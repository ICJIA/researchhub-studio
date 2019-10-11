<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    min-width="290px"
    offset-y
    transition="scale-transition"
  >
    <template #activator="{ on }">
      <v-text-field
        v-model="dateLocal"
        :append-icon="$options.static.mdiCalendar"
        label="Date"
        readonly
        v-on="on"
      />
    </template>

    <v-date-picker v-model="dateLocal" no-title scrollable @input="onInput" />
  </v-menu>
</template>

<script>
import { mdiCalendar } from '@mdi/js'

export default {
  props: {
    date: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dateLocal: null,
      menu: false
    }
  },
  mounted() {
    this.dateLocal = this.date
  },
  updated() {
    this.dateLocal = this.date
  },
  methods: {
    onInput(e) {
      this.menu = false
      this.$emit('update:date', e)
    }
  },
  static: {
    mdiCalendar
  }
}
</script>
