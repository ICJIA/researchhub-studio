<template>
  <v-col class="mx-auto mt-6 px-0" cols="12" sm="10" lg="8" xl="7">
    <AppView v-if="view" :item="item" :preview="true" />

    <v-col v-else class="mx-auto" cols="12" md="4">
      <AppCard
        :horizontal="$vuetify.breakpoint.smOnly"
        :item="item"
        :preview="true"
      />
    </v-col>
  </v-col>
</template>

<script>
const AppCard = () => import('researchhub-lib').then(m => m.AppCard)
const AppView = () => import('researchhub-lib').then(m => m.AppView)

export default {
  components: {
    AppCard,
    AppView
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    view: Boolean
  }
}
</script>
