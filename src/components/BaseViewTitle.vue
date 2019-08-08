<template>
  <div class="view-title">
    <v-container class="py-3">
      <v-layout justify-center>
        <v-flex xs12 sm10 xl8>
          <h3 class="light">
            <template>{{ 'ICJIA Research Hub' }}</template>
            <v-icon color="white">chevron_right</v-icon>
            <template>{{ 'Studio' }}</template>
            <template v-if="page">
              <v-icon color="white">chevron_right</v-icon>{{ page }}
            </template>
          </h3>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    page: String
  }
}
</script>

<style scoped>
.view-title {
  color: white;
  background-color: #466c8c;
}
</style>
