<template>
  <v-container>
    <v-layout row wrap align-center justify-center fill-height>
      <login-form />
    </v-layout>
  </v-container>
</template>

<script>
const LoginForm = () => import('@/components/LoginForm')

export default {
  components: {
    LoginForm
  }
}
</script>
