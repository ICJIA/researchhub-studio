<template>
  <BaseViewLayout>
    <div class="text-xs-center py-3">
      <h1 class="uppercase font-lato bold">Choose your task</h1>
      <p>Permission level: {{ role }}</p>
    </div>

    <v-layout row wrap justify-center mb-5>
      <template v-for="(task, i) in tasks">
        <v-flex :key="i" v-if="checkPermission(task)" xs12 sm6 lg4>
          <HomeTaskCard :task="task" />
        </v-flex>
      </template>
    </v-layout>
  </BaseViewLayout>
</template>

<script>
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const HomeTaskCard = () => import('@/components/HomeTaskCard')

export default {
  components: {
    BaseViewLayout,
    HomeTaskCard
  },
  computed: {
    tasks() {
      return this.$store.state.task.items
    },
    role() {
      return this.$store.state.auth.role
    }
  },
  methods: {
    checkPermission(card) {
      if (this.role === 'Administrator') {
        return true
      } else {
        return !card.adminOnly
      }
    }
  }
}
</script>
