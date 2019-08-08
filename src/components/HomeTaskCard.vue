<template>
  <v-container>
    <router-link :to="`/${task.path}`">
      <v-card hover height="150">
        <v-layout
          align-center
          justify-center
          fill-height
          row
          wrap
          class="text-xs-center"
        >
          <span class="uppercase large">{{ task.title }}</span>
          <span v-if="task.adminOnly" class="pl-2 admin-only small">
            <v-icon small color="error">warning</v-icon>{{ 'Admin only' }}
          </span>
        </v-layout>
      </v-card>
    </router-link>
  </v-container>
</template>

<script>
export default {
  props: {
    task: Object
  }
}
</script>

<style scoped>
.admin-only {
  color: grey;
}
</style>
