<template>
  <BaseViewLayout>
    <div class="text-center py-6">
      <h1 class="font-lato font-weight-bold text-uppercase wide">
        <template>{{ 'Choose your task' }}</template>
      </h1>
      <p>Permission level: {{ role }}</p>
    </div>

    <v-row class="mb-12" justify="center">
      <template v-for="(task, i) in tasks">
        <v-col :key="i" v-if="checkPermission(task)" cols="12" sm="6" lg="4">
          <HomeTaskCard :task="task" />
        </v-col>
      </template>
    </v-row>

    <div class="text-center">
      <AuthorGuideButton />
    </div>
  </BaseViewLayout>
</template>

<script>
import tasks from '@/consts/tasks'
const AuthorGuideButton = () => import('@/components/AuthorGuideButton')
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const HomeTaskCard = () => import('@/components/HomeTaskCard')

export default {
  components: {
    AuthorGuideButton,
    BaseViewLayout,
    HomeTaskCard
  },
  computed: {
    tasks() {
      return tasks
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
