<template>
  <v-app>
    <TheToolbar />

    <router-view v-if="alive" />

    <ServerError v-else />

    <TheFooter />
  </v-app>
</template>

<script>
import { healthCheck } from '@/services/client.utils'
const ServerError = () => import('./components/ServerError')
const TheToolbar = () => import('./components/TheToolbar')
const TheFooter = () => import('./components/TheFooter')

export default {
  components: {
    ServerError,
    TheToolbar,
    TheFooter
  },
  data() {
    return {
      alive: true
    }
  },
  async created() {
    this.alive = await healthCheck()
  }
}
</script>

<style>
#app {
  font-family: 'Lato', sans-serif;
  font-size: 16px;
}

.error-page {
  font-size: 1.25rem;
  text-align: center;
  margin-top: 5%;
}

.error-page h1 {
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  font-weight: bold;
}
</style>
