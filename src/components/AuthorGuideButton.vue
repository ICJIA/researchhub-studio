<template>
  <v-btn text :href="href" target="_blank">
    <v-icon class="small" color="warning">{{ mdiHelpCircle }}</v-icon>
    <span class="px-1 small">{{ text }}</span>
  </v-btn>
</template>

<script>
import { mdiHelpCircle } from '@mdi/js'

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
  data() {
    return {
      mdiHelpCircle
    }
  },
  computed: {
    href() {
      return `${process.env.VUE_APP_MAIN_BASE_URL}/docs/auth-guide/${this.path}`
    }
  }
}
</script>
