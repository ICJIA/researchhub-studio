<template>
  <BaseStepper :step-num-total="2" @stepper-navigate-before="onNavigateBefore">
    <template #stepHeader1>{{ 'Select content type' }}</template>

    <template #stepHeader2>{{ 'Create' }}</template>

    <template #stepItem1>
      <ContentTypeSelector
        :content-types="contentTypes"
        :content-type.sync="contentType"
      />
    </template>

    <template #stepItem2>
      <CreateForm :key="formKey" :content-type="contentType" :update="false" />
    </template>
  </BaseStepper>
</template>

<script>
import resetItem from '@/utils/resetItem'
import setupStepper from '@/utils/setupStepper'

const BaseStepper = () => import('@/components/BaseStepper')
const ContentTypeSelector = () => import('@/components/ContentTypeSelector')
const CreateForm = () => import('@/components/CreateForm')

export default {
  components: {
    BaseStepper,
    ContentTypeSelector,
    CreateForm
  },
  data() {
    return {
      formKey: 0
    }
  },
  created() {
    setupStepper(this)
  },
  methods: {
    onNavigateBefore() {
      resetItem(this.$store)
      this.formKey += 1
    }
  }
}
</script>
