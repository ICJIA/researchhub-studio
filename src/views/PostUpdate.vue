<template>
  <BaseViewLayout>
    <template v-slot:title>{{ 'Post update' }}</template>

    <template v-slot:description>
      <template>{{ 'Post updates to existing items.' }}</template>
      <span class="greycolor ml-3">
        <v-icon color="error">warning</v-icon>
        <template>{{ 'Admin only' }}</template>
      </span>
    </template>

    <UpdateStepper type="post" />
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
