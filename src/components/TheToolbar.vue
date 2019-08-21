<template>
  <BaseToolbar :menu="isLoggedIn" logoPath="./icjia-logo.png">
    <template v-slot:titleExtra>
      <span class="light"> Studio</span>
    </template>

    <template v-slot:toolbarItems v-if="isLoggedIn">
      <v-btn v-for="(view, i) in views" :key="i" :to="`/${view.path}`" text>
        <v-icon v-if="/post/.test(view.name)" color="error">mdi-alert</v-icon>
        <template>{{ view.name }}</template>
      </v-btn>

      <v-btn color="primary" text @click="logout">log out</v-btn>
    </template>

    <template v-slot:toolbarDrawerItems v-if="isLoggedIn">
      <v-list-item v-for="(view, i) in views" :key="i" :to="`/${view.path}`">
        <v-icon v-if="/post/.test(view.name)" color="error">mdi-alert</v-icon>
        <v-list-item-title>{{ view.name }}</v-list-item-title>
      </v-list-item>

      <v-list-item @click="logout">
        <v-list-item-title>log out</v-list-item-title>
      </v-list-item>
    </template>
  </BaseToolbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', {
      isLoggedIn: 'isLoggedIn'
    }),
    views() {
      const views = [
        { name: 'home', path: '' },
        { name: 'create', path: 'create' },
        { name: 'update', path: 'update' },
        { name: 'manage', path: 'manage' }
      ]

      if (this.$store.state.auth.role === 'Administrator') {
        views.push(
          { name: 'post new', path: 'post-new' },
          { name: 'post up', path: 'post-update' }
        )
      }

      return views
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => this.$router.push('/login'))
    }
  }
}
</script>
