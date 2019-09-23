<template>
  <router-link :to="`/${task.path}`">
    <v-card class="ma-2" height="150" hover>
      <v-row class="fill-height" align="center" justify="center">
        <span class="large text-uppercase wide">{{ task.title }}</span>
        <span v-if="task.adminOnly" class="pl-2">
          <v-icon small color="error">{{ $options.static.mdiAlert }}</v-icon>
          <span class="small admin-only">Admin only</span>
        </span>
      </v-row>
    </v-card>
  </router-link>
</template>

<script>
import { mdiAlert } from '@mdi/js'

export default {
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  static: {
    mdiAlert
  }
}
</script>

<style scoped>
.admin-only {
  color: grey;
}
</style>
