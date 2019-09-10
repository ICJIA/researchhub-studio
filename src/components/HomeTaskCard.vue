<template>
  <router-link :to="`/${task.path}`">
    <v-card class="ma-2" hover height="150">
      <v-row align="center" justify="center" class="fill-height">
        <span class="large text-uppercase wide">{{ task.title }}</span>
        <span v-if="task.adminOnly" class="pl-2">
          <v-icon small color="error">mdi-alert</v-icon>
          <span class="small admin-only">Admin only</span>
        </span>
      </v-row>
    </v-card>
  </router-link>
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
