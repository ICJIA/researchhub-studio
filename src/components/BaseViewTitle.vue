<template>
  <div class="view-title font-lato">
    <v-col class="mx-auto py-2" cols="12" sm="10" lg="8" xl="7">
      <h4 class="light">
        <template>{{ 'ICJIA Research Hub' }}</template>
        <v-icon color="white">mdi-chevron-right</v-icon>
        <template>{{ 'Studio' }}</template>
        <template v-if="page">
          <v-icon color="white">mdi-chevron-right</v-icon>{{ page }}
        </template>
      </h4>
    </v-col>
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
  background-color: #466c8c;
  color: white;
}
</style>
