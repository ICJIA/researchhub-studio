<template>
  <div class="font-lato pa-4">
    <v-row class="mb-4">
      <div class="greycolor">
        <template>{{ 'Content type: ' }}</template>
        <span class="text-capitalize">{{ contentType }}</span>
      </div>

      <v-spacer></v-spacer>

      <BaseButtonDialog
        btn-name="reset"
        btn-type="error"
        @base-event="$emit('form-reset')"
      >
        <template #title>{{ 'Are you sure?' }}</template>

        <template #main>{{ $options.static.msgWarning }}</template>
      </BaseButtonDialog>

      <BaseButtonDialog
        :btn-condition="itemReady"
        :btn-name="formType"
        btn-type="primary"
        @base-event="$emit('form-main')"
      >
        <template #title>
          <h3>Ready to {{ formType }}?</h3>
        </template>

        <template #main>
          <template>{{ msgMain }}</template>
          <br />
          <template v-if="formType === 'create'">{{
            $options.static.msgCreate
          }}</template>
        </template>
      </BaseButtonDialog>
    </v-row>

    <slot></slot>
  </div>
</template>

<script>
const BaseButtonDialog = () => import('@/components/BaseButtonDialog')

export default {
  components: {
    BaseButtonDialog
  },
  props: {
    contentType: {
      type: String,
      default: ''
    },
    formType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      stepNum: 1
    }
  },
  computed: {
    itemReady() {
      return Object.keys(this.$store.state.content.item).length !== 0
    },
    msgMain() {
      return `Make sure to preview the content before you ${this.formType} it!`
    }
  },
  static: {
    msgCreate:
      'You will be able to update or submit this draft later.' +
      ' When you submit a draft, your submission will get a preview link.' +
      ' You may publish your submission once approved.',
    msgWarning:
      'You will lose the saved work. Are you sure to proceed and reset?'
  }
}
</script>
