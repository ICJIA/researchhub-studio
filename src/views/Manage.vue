<template>
  <BaseViewLayout>
    <template #title>{{ 'Manage contents' }}</template>

    <template #description>{{
      'Review and publish submissions or take down published items to make changes.'
    }}</template>

    <ManageStepper />
  </BaseViewLayout>
</template>

<script>
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const ManageStepper = () => import('@/components/ManageStepper')

export default {
  components: {
    BaseViewLayout,
    ManageStepper
  }
}
</script>
