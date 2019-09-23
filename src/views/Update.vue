<template>
  <BaseViewLayout>
    <template #title>{{ 'Update contents' }}</template>

    <template #description>{{
      'Make updates to existing drafts. Select an item to update, make changes, and apply the update.'
    }}</template>

    <UpdateStepper type="create" />
  </BaseViewLayout>
</template>

<script>
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const UpdateStepper = () => import('@/components/UpdateStepper')

export default {
  components: {
    BaseViewLayout,
    UpdateStepper
  }
}
</script>
