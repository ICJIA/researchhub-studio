<template>
  <BaseStepper :stepNumTotal="2">
    <template v-slot:stepHeader1>{{ stepHeader1 }}</template>

    <template v-slot:stepHeader2>{{ stepHeader2 }}</template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepItem2>
      <PostForm :contentType="contentType" :update="false" />
    </template>
  </BaseStepper>
</template>

<script>
const BaseStepper = () => import('@/components/BaseStepper')
const PostForm = () => import('@/components/PostForm')
const ContentTypeSelector = () => import('@/components/ContentTypeSelector')

export default {
  components: {
    BaseStepper,
    PostForm,
    ContentTypeSelector
  },
  data() {
    return {
      contentType: 'apps',
      contentTypes: this.$store.state.content.typesAll,
      stepHeader1: 'Select content type',
      stepHeader2: 'Post'
    }
  },
  methods: {
    navigateBefore() {
      this.$store.dispatch('content/setItem', {})
    }
  }
}
</script>

<style scoped>
.no-shadow >>> div {
  --webkit-box-shadow: None !important;
  box-shadow: None !important;
}
</style>
