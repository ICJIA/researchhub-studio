<template>
  <BaseViewLayout>
    <template #title>{{ 'Post update' }}</template>

    <template #description>
      <template>{{ 'Post updates to existing items.' }}</template>
      <span class="greycolor ml-4">
        <v-icon color="error">{{ $options.static.mdiAlert }}</v-icon>
        <template>{{ 'Admin only' }}</template>
      </span>
    </template>

    <UpdateStepper type="post" />
  </BaseViewLayout>
</template>

<script>
import { mdiAlert } from '@mdi/js'
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const UpdateStepper = () => import('@/components/UpdateStepper')

export default {
  components: {
    BaseViewLayout,
    UpdateStepper
  },
  static: {
    mdiAlert
  }
}
</script>
