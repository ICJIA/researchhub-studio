<template>
  <v-col class="mx-auto mt-6 px-0" cols="12" sm="10" lg="8" xl="7">
    <RHAppView v-if="view" :item="item" :preview="true" />

    <v-col class="mx-auto" v-else cols="12" sm="6" lg="4">
      <RHAppCard :item="item" :preview="true" />
    </v-col>
  </v-col>
</template>

<script>
const RHAppCard = () =>
  import('icjia-research-lib/lib/cjs').then(lib => lib.AppCard)
const RHAppView = () =>
  import('icjia-research-lib/lib/cjs').then(lib => lib.AppView)

export default {
  components: {
    RHAppCard,
    RHAppView
  },
  props: {
    item: Object,
    view: Boolean
  }
}
</script>
