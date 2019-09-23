<template>
  <BaseStepper :step-num-total="2" @stepper-navigate-before="navigateBefore">
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
import stepperMixin from '@/mixins/stepperMixin'
const BaseStepper = () => import('@/components/BaseStepper')
const ContentTypeSelector = () => import('@/components/ContentTypeSelector')
const CreateForm = () => import('@/components/CreateForm')

export default {
  components: {
    BaseStepper,
    ContentTypeSelector,
    CreateForm
  },
  mixins: [stepperMixin],
  data() {
    return {
      formKey: 0
    }
  },
  methods: {
    navigateBefore() {
      this.resetItem()
      this.formKey += 1
    }
  }
}
</script>
