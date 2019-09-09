<template>
  <v-btn text :href="href" target="_blank">
    <v-icon class="small" color="warning">mdi-help-circle</v-icon>
    <span class="px-1 small">{{ text }}</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'Go to Author Guide'
    }
  },
  computed: {
    href() {
      return `${process.env.VUE_APP_MAIN_BASE_URL}/docs/auth-guide/${this.path}`
    }
  }
}
</script>
