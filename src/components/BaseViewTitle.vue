<template>
  <div class="view-title font-lato">
    <v-col class="mx-auto py-2" cols="12" sm="10" lg="8" xl="7">
      <h4 class="font-weight-light text-capitalize">
        <template>{{ 'ICJIA Research Hub' }}</template>
        <v-icon color="white">{{ $options.static.mdiChevronRight }}</v-icon>
        <template>{{ 'studio' }}</template>
        <template v-if="page">
          <v-icon color="white">{{ $options.static.mdiChevronRight }}</v-icon>
          <template>{{ page }}</template>
        </template>
      </h4>
    </v-col>
  </div>
</template>

<script>
import { mdiChevronRight } from '@mdi/js'

export default {
  props: {
    page: {
      type: String,
      default: null
    }
  },
  static: {
    mdiChevronRight
  }
}
</script>

<style scoped>
.view-title {
  background-color: #466c8c;
  color: white;
}
</style>
