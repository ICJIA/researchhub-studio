<template>
  <BaseViewLayout>
    <template v-slot:title>{{ 'Create contents' }}</template>

    <template v-slot:description>
      <template>{{
        'Fill out the form, preview the result, and create a new item.'
      }}</template>
      <v-icon class="pl-4" color="warning">mdi-alert</v-icon>
      <span class="greycolor">{{
        'Uploading files is available only in the update page.'
      }}</span>
    </template>

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
