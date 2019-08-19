<template>
  <BaseStepper :stepNumTotal="2" @stepper-navigate-before="resetItem">
    <template v-slot:stepHeader1>{{ 'Select content type' }}</template>

    <template v-slot:stepHeader2>{{ 'Post' }}</template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepItem2>
      <PostForm :contentType="contentType" :update="false" status="created" />
    </template>
  </BaseStepper>
</template>

<script>
import stepperMixin from '@/mixins/stepperMixin'
const BaseStepper = () => import('@/components/BaseStepper')
const PostForm = () => import('@/components/PostForm')
const ContentTypeSelector = () => import('@/components/ContentTypeSelector')

export default {
  components: {
    BaseStepper,
    PostForm,
    ContentTypeSelector
  },
  mixins: [stepperMixin]
}
</script>

<style scoped>
.no-shadow >>> div {
  --webkit-box-shadow: None !important;
  box-shadow: None !important;
}
</style>
