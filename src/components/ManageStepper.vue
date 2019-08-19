<template>
  <BaseStepper :stepNumTotal="2" @stepper-navigate-before="navigateBefore">
    <template v-slot:stepHeader1>{{ stepHeader1 }}</template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepHeader2>{{ stepHeader2 }}</template>

    <template v-slot:stepItem2>
      <div class="text-center greycolor">
        <template>{{ 'Content type: ' }}</template>
        <span class="capitalize">{{ contentType }}</span>
      </div>

      <v-radio-group
        v-model="status"
        label="Status:"
        class="justify-center mt-2 pt-0"
        row
      >
        <v-radio
          v-for="status in statusOptions"
          :key="status"
          :label="status[0].toUpperCase() + status.slice(1)"
          :value="status"
        ></v-radio>
      </v-radio-group>

      <ItemTable type="manage" :contentType="contentType" :status="status" />
    </template>
  </BaseStepper>
</template>

<script>
import contentTypes from '@/consts/contentTypes'
import { statusOptions } from '@/consts/fieldOptions'

const BaseStepper = () => import('@/components/BaseStepper')
const ContentTypeSelector = () => import('@/components/ContentTypeSelector')
const ItemTable = () => import('@/components/ItemTable')

export default {
  components: {
    BaseStepper,
    ContentTypeSelector,
    ItemTable
  },
  props: {
    type: String
  },
  data() {
    return {
      contentType: 'apps',
      contentTypes,
      status: 'submitted',
      statusOptions,
      stepHeader1: 'Select content type',
      stepHeader2: 'Manage'
    }
  },
  watch: {
    contentType() {
      this.status = 'submitted'
    }
  },
  methods: {
    navigateBefore() {
      this.$store.dispatch('content/setItem', {})
      this.$store.dispatch('content/setItemId', '')
    }
  }
}
</script>

<style scoped>
.no-shadow >>> div {
  --webkit-box-shadow: None !important;
  box-shadow: None !important;
}
</style>
