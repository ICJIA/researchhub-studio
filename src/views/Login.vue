<template>
  <div class="fill-height" style="background-color:#466c8c;">
    <v-row class="fill-height" align="center" justify="center">
      <login-form />
    </v-row>
  </div>
</template>

<script>
const LoginForm = () => import('@/components/LoginForm')

export default {
  components: {
    LoginForm
  }
}
</script>
