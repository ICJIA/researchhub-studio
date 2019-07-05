<template>
  <v-container>
    <v-layout justify-center>
      <v-flex v-if="view" xs12 sm10 md8>
        <RHAppView :item="item" />
      </v-flex>

      <v-flex v-else xs12 sm10 xl8>
        <v-layout justify-center>
          <v-flex xs12 sm6 lg4>
            <RHAppCard :item="item" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
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
