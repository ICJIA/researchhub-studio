<template>
  <v-form ref="form" v-model="valid" class="font-lato" lazy-validation>
    <v-sheet
      class="elevation-24"
      :class="loginError ? 'login-error' : ''"
      width="300px"
    >
      <div class="py-4 text-center">
        <h3>Log in</h3>
        <span class="font-weight-light large">with a valid account</span>
      </div>

      <div class="px-6 pt-4 pb-10">
        <v-text-field
          ref="username"
          v-model="username"
          class="input-group--focused"
          label="Username"
          :rules="[rules.required]"
          outlined
          @keyup.enter="login"
        />

        <v-text-field
          v-model="password"
          label="Password"
          class="input-group--focused pb-4"
          :rules="[rules.required]"
          :type="showPassword ? 'text' : 'password'"
          :append-icon="
            showPassword ? $options.static.mdiEyeOff : $options.static.mdiEye
          "
          outlined
          @keyup.enter="login"
          @click:append="showPassword = !showPassword"
        />

        <v-btn block color="primary" @click="login" @keyup.enter="login">
          <template>{{ 'log in' }}</template>
        </v-btn>

        <div
          v-if="loginError"
          class="text-center mt-6 px-6 login-error-message"
        >
          Invalid username or password!
        </div>
      </div>
    </v-sheet>
  </v-form>
</template>

<script>
import { mdiEye, mdiEyeOff } from '@mdi/js'
import NProgress from 'nprogress'

export default {
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
  async mounted() {
    await this.$nextTick(this.$refs.username.focus)
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
          .catch(() => {
            this.loginError = true
            NProgress.done()
          })
      }
    }
  },
  static: {
    mdiEye,
    mdiEyeOff
  }
}
</script>

<style scoped>
.login-error {
  border: 1px solid #ff5252 !important;
  box-shadow: 0 3px 1px -2px rgba(255, 0, 0, 0.2),
    0 2px 2px 0 rgba(255, 0, 0, 0.14), 0 1px 5px 0 rgba(255, 0, 0, 0.12) !important;
}

.login-error-message {
  color: #ff5252;
}
</style>
