<template>
  <v-btn :href="href" text target="_blank">
    <v-icon class="small" color="warning">{{
      $options.static.mdiHelpCircle
    }}</v-icon>
    <span class="px-1 small">{{ text }}</span>
  </v-btn>
</template>

<script>
import { mdiHelpCircle } from '@mdi/js'
import { main } from '@/config'

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
      return `${main.baseURL}/docs/auth-guide/${this.path}`
    }
  },
  static: {
    mdiHelpCircle
  }
}
</script>
