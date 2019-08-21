<template>
  <BaseStepper :stepNumTotal="2" @stepper-navigate-before="navigateBefore">
    <template v-slot:stepHeader1>{{ 'Select content type' }}</template>

    <template v-slot:stepHeader2>{{ 'Create' }}</template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepItem2>
      <CreateForm :contentType="contentType" :key="formKey" :update="false" />
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
