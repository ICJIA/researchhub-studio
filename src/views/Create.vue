<template>
  <BaseViewLayout>
    <template v-slot:title>{{ 'Create contents' }}</template>

    <template v-slot:description>{{
      'You can fill out the following form, preview the result, and create a new item.'
    }}</template>

    <CreateStepper />
  </BaseViewLayout>
</template>

<script>
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const CreateStepper = () => import('@/components/CreateStepper')

export default {
  components: {
    BaseViewLayout,
    CreateStepper
  }
}
</script>
