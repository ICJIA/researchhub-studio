<template>
  <BaseToolbar :menu="isLoggedIn" :logo-path="$options.static.logoPath">
    <template #titleExtra>
      <span class="font-weight-light"> Studio</span>
    </template>

    <template v-if="isLoggedIn" #toolbarItems>
      <v-btn v-for="(view, i) in views" :key="i" :to="`/${view.path}`" text>
        <v-icon v-if="/post/.test(view.name)" color="error">{{
          $options.static.mdiAlert
        }}</v-icon>
        <template>{{ view.name }}</template>
      </v-btn>

      <v-btn color="primary" text @click="logout">log out</v-btn>
    </template>

    <template v-if="isLoggedIn" #toolbarDrawerItems>
      <v-list-item v-for="(view, i) in views" :key="i" :to="`/${view.path}`">
        <v-icon v-if="/post/.test(view.name)" color="error">{{
          $options.static.mdiAlert
        }}</v-icon>
        <v-list-item-title>{{ view.name }}</v-list-item-title>
      </v-list-item>

      <v-list-item @click="logout">
        <v-list-item-title>log out</v-list-item-title>
      </v-list-item>
    </template>
  </BaseToolbar>
</template>

<script>
import { mdiAlert } from '@mdi/js'
import { mapState } from 'vuex'
const BaseToolbar = () => import('researchhub-lib').then(m => m.BaseToolbar)

export default {
  components: {
    BaseToolbar
  },
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
  },
  static: {
    logoPath: process.env.BASE_URL + 'icjia-logo.png',
    mdiAlert
  }
}
</script>
