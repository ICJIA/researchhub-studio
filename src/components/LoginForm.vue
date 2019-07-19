<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card :class="loginError ? 'login-error' : ''" width="300px">
      <v-card-text class="text-xs-center">
        <h3>Log in</h3>
        <h3 style="font-weight:300;">with a valid account</h3>
      </v-card-text>

      <v-container>
        <v-text-field
          v-model="username"
          label="Username"
          class="input-group--focused"
          :rules="[rules.required]"
          ref="username"
          outline
          @keyup.enter="login"
        />

        <v-text-field
          v-model="password"
          label="Password"
          class="input-group--focused"
          :rules="[rules.required]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="showPassword ? 'visibility_off' : 'visibility'"
          outline
          @keyup.enter="login"
          @click:append="showPassword = !showPassword"
        />

        <v-btn block color="primary" @click="login" @keyup.enter="login">
          <template>{{ 'log in' }}</template>
        </v-btn>

        <v-card-text
          v-if="loginError"
          class="text-xs-center mt-4 login-error-message"
        >
          <h3>Invalid username or password!</h3>
        </v-card-text>
      </v-container>
    </v-card>
  </v-form>
</template>

<script>
export default {
  async mounted() {
    await this.$nextTick(this.$refs.username.focus)
  },
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      loginError: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      valid: true
    }
  },
  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('auth/login', {
            identifier: this.username,
            password: this.password
          })
          .then(() => this.$router.push('/'))
          .catch(() => (this.loginError = true))
      }
    }
  }
}
</script>

<style>
.login-error {
  border: 1px solid #ff5252 !important;
  box-shadow: 0 3px 1px -2px rgba(255, 0, 0, 0.2),
    0 2px 2px 0 rgba(255, 0, 0, 0.14), 0 1px 5px 0 rgba(255, 0, 0, 0.12) !important;
}

.login-error-message {
  color: #ff5252;
}
</style>
