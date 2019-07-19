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
          class="task-card"
        >
          <v-flex xs12>
            <div class="font-lato uppercase large">
              {{ task.title }}
            </div>
            <div v-if="task.adminOnly" class="admin-only pt-2">
              <v-icon color="error">warning</v-icon>
              <template>{{ 'Admin only' }}</template>
            </div>
          </v-flex>
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
.task-card {
  text-align: center;
}

.task-card:hover {
  font-weight: 600;
}

.large {
  font-size: 1.2em;
}

.admin-only {
  color: grey;
}
</style>
