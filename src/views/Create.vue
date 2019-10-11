<template>
  <BaseViewLayout>
    <template #title>{{ 'Create contents' }}</template>

    <template #description>
      <template>{{
        'Fill out the form, preview the result, and create a new item.'
      }}</template>
      <span class="greycolor pl-4">
        <v-icon color="warning">{{ $options.static.mdiAlert }}</v-icon>
        <template>{{
          'Uploading files is available only in the update page.'
        }}</template>
      </span>
    </template>

    <CreateStepper />
  </BaseViewLayout>
</template>

<script>
import { mdiAlert } from '@mdi/js'
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const CreateStepper = () => import('@/components/CreateStepper')

export default {
  components: {
    BaseViewLayout,
    CreateStepper
  },
  static: {
    mdiAlert
  }
}
</script>
