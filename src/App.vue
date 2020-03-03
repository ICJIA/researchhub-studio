<template>
  <v-app>
    <TheToolbar />

    <v-content>
      <AlertCOVID ref="alert" />
      <router-view v-if="alive" />
      <ServerError v-else />
    </v-content>

    <TheFooter v-if="loggedIn" />
  </v-app>
</template>

<script>
import { healthCheck } from '@/services/client.utils'
import TheToolbar from './components/TheToolbar'
const AlertCOVID = () => import('researchhub-lib').then(m => m.AlertCOVID)
const ServerError = () => import('./components/ServerError')
const TheFooter = () => import('./components/TheFooter')

export default {
  name: 'App',
  components: {
    AlertCOVID,
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
  watch: {
    $route() {
      if (this.$refs.alert) this.$refs.alert.reset()
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
  font-family: 'Lato';
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
