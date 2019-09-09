<template>
  <div>
    <BaseViewTitle :page="page" />

    <v-col class="mx-auto font-lato" cols="12" sm="10" lg="8" xl="7">
      <template v-if="page">
        <v-row justify="space-between" no-gutters>
          <h2 class="bold"><slot name="title"></slot></h2>

          <AuthorGuideButton
            v-if="isAuthor"
            :path="`tutorials/${page.toLowerCase()}-article`"
            text="Go to tutorial page"
          />
        </v-row>

        <p class="py-2"><slot name="description"></slot></p>
      </template>

      <slot></slot>
    </v-col>
  </div>
</template>

<script>
const AuthorGuideButton = () => import('@/components/AuthorGuideButton')
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  components: {
    AuthorGuideButton,
    BaseViewTitle
  },
  computed: {
    page() {
      const name = this.$route.name
      return name === 'home'
        ? ''
        : name
            .split(' ')
            .map(el => `${el.charAt(0).toUpperCase()}${el.slice(1)}`)
            .join(' ')
    },
    isAuthor() {
      return this.$store.state.auth.role === 'Author'
    }
  }
}
</script>
