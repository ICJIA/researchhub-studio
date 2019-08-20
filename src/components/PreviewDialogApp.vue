<template>
  <v-col class="mx-auto mt-6 px-0" cols="12" sm="10" lg="8" xl="7">
    <AppView v-if="view" :item="item" :preview="true" />

    <v-col class="mx-auto" v-else cols="12" sm="6" lg="4">
      <AppCard :item="item" :preview="true" />
    </v-col>
  </v-col>
</template>

<script>
export default {
  props: {
    item: Object,
    view: Boolean
  }
}
</script>
