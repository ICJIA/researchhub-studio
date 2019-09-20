<template>
  <BaseViewLayout>
    <template v-slot:title>{{ 'Post new' }}</template>

    <template v-slot:description>
      <template>{{ 'Post new items of any type and status.' }}</template>
      <span class="greycolor ml-4">
        <v-icon color="error">{{ $options.static.mdiAlert }}</v-icon>
        <template>{{ 'Admin only' }}</template>
      </span>
    </template>

    <PostStepper />
  </BaseViewLayout>
</template>

<script>
import { mdiAlert } from '@mdi/js'
const BaseViewLayout = () => import('@/components/BaseViewLayout')
const PostStepper = () => import('@/components/PostStepper')

export default {
  components: {
    BaseViewLayout,
    PostStepper
  },
  static: {
    mdiAlert
  }
}
</script>
