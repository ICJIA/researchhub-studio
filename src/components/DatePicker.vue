<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    v-model="menu"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="dateLocal"
      label="Date"
      append-icon="event"
      readonly
    />

    <v-date-picker v-model="dateLocal" no-title scrollable @input="onInput" />
  </v-menu>
</template>

<script>
export default {
  props: {
    date: String
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
  }
}
</script>
