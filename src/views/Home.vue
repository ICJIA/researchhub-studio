<template>
  <BaseViewLayout>
    <div class="text-center py-6">
      <h1 class="uppercase font-lato bold wide">Choose your task</h1>
      <p>Permission level: {{ role }}</p>
    </div>

    <v-row class="mb-12" justify="center">
      <template v-for="(task, i) in tasks">
        <v-col :key="i" v-if="checkPermission(task)" cols="12" sm="6" lg="4">
          <HomeTaskCard :task="task" />
        </v-col>
      </template>
    </v-row>
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
