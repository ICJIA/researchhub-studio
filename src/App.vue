<template>
  <v-app>
    <TheToolbar />

    <v-content>
      <router-view v-if="alive" />

      <ServerError v-else />
    </v-content>

    <TheFooter v-if="loggedIn" />
  </v-app>
</template>

<script>
import { healthCheck } from '@/services/client.utils'
import TheToolbar from './components/TheToolbar'
const ServerError = () => import('./components/ServerError')
const TheFooter = () => import('./components/TheFooter')

export default {
  name: 'App',
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
  computed: {
    loggedIn() {
      return this.$store.state.auth.isLoggedIn
    }
  },
  async created() {
    this.alive = await healthCheck()
  }
}
</script>

<style>
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

.wide {
  letter-spacing: 0.05em;
}
</style>
