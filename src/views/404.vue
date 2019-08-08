<template>
  <div>
    <BaseViewTitle page="Error" />

    <div class="error-page">
      <v-icon x-large color="error">cancel</v-icon>
      <h1 class="pb-3">Page not found</h1>

      <p>Sorry. The page you are looking for does not exist.</p>
      <v-btn flat to="/">return to home <v-icon>replay</v-icon></v-btn>
    </div>
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  components: {
    BaseViewTitle
  }
}
</script>
