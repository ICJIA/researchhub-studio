<template>
  <div class="font-lato pa-4">
    <v-row class="mb-4">
      <div class="greycolor">
        <template>{{ 'Content type: ' }}</template>
        <span class="text-capitalize">{{ contentType }}</span>
      </div>

      <v-spacer></v-spacer>

      <BaseButtonDialog
        btnName="reset"
        btnType="error"
        @base-event="$emit('form-reset')"
      >
        <template v-slot:title>{{ 'Are you sure?' }}</template>

        <template v-slot:main>{{ $options.static.msgWarning }}</template>
      </BaseButtonDialog>

      <BaseButtonDialog
        btnType="primary"
        :btnName="formType"
        :btnCondition="itemReady"
        @base-event="$emit('form-main')"
      >
        <template v-slot:title>
          <h3>Ready to {{ formType }}?</h3>
        </template>

        <template v-slot:main>
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
    contentType: String,
    formType: String
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
