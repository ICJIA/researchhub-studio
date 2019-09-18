<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        v-on="on"
        v-model="dateLocal"
        label="Date"
        :append-icon="mdiCalendar"
        readonly
      />
    </template>

    <v-date-picker v-model="dateLocal" no-title scrollable @input="onInput" />
  </v-menu>
</template>

<script>
import { mdiCalendar } from '@mdi/js'

export default {
  props: {
    date: String
  },
  data() {
    return {
      dateLocal: null,
      mdiCalendar,
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
  }
}
</script>
