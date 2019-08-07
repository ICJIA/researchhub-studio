<template>
  <div>
    <div class="view-title">
      <v-container class="py-3">
        <v-layout justify-center>
          <v-flex xs12 sm10 xl8>
            <h3 class="light">
              <template>{{ 'ICJIA Research Hub' }}</template>
              <v-icon color="white">chevron_right</v-icon>
              <template>{{ 'Studio' }}</template>
              <template v-if="task">
                <v-icon color="white">chevron_right</v-icon>{{ page }}
              </template>
            </h3>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm10 xl8>
          <template v-if="task">
            <h2 class="bold"><slot name="title"></slot></h2>
            <p class="py-2"><slot name="description"></slot></p>
          </template>
          <slot></slot>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    task() {
      return this.$route.name !== 'home'
    },
    page() {
      return this.$route.name
        .split(' ')
        .map(el => `${el.charAt(0).toUpperCase()}${el.slice(1)}`)
        .join(' ')
    }
  }
}
</script>

<style scoped>
.view-title {
  color: white;
  background-color: #466c8c;
}
</style>
