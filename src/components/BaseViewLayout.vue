<template>
  <div class="font-lato">
    <BaseViewTitle :page="page" />

    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm10 xl8>
          <template v-if="page">
            <h2 class="bold"><slot name="title"></slot></h2>
            <p class="py-2"><slot name="description"></slot></p>
          </template>
          <slot></slot>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
const BaseViewTitle = () => import('@/components/BaseViewTitle')

export default {
  components: {
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
    }
  }
}
</script>
