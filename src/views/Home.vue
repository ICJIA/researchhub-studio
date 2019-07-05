<template>
  <v-container>
    <v-layout row wrap align-center justify-center fill-height>
      <v-flex xs12 sm10 lg8>
        <div class="text-xs-center font-lato">
          <h1 class="uppercase font-lato">Choose your task</h1>
          <p>Permission level: {{ role }}</p>
        </div>

        <v-layout row wrap justify-center>
          <template v-for="(task, i) in tasks">
            <v-flex :key="i" v-if="checkPermission(task)" xs12 sm6 lg4>
              <HomeTaskCard :task="task" />
            </v-flex>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
const HomeTaskCard = () => import('@/components/HomeTaskCard')

export default {
  components: {
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
