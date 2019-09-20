<template>
  <BaseStepper :step-num-total="2" @stepper-navigate-before="resetItem">
    <template #stepHeader1>{{ 'Select content type' }}</template>

    <template #stepHeader2>{{ 'Post' }}</template>

    <template #stepItem1>
      <ContentTypeSelector
        :content-types="contentTypes"
        :content-type.sync="contentType"
      />
    </template>

    <template #stepItem2>
      <PostForm :content-type="contentType" status="created" :update="false" />
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
