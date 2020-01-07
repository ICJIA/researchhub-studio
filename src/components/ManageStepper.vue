<template>
  <BaseStepper :step-num-total="2" @stepper-navigate-before="onNavigateBefore">
    <template #stepHeader1>{{ 'Select content type' }}</template>

    <template #stepItem1>
      <ContentTypeSelector
        :content-types="contentTypes"
        :content-type.sync="contentType"
      />
    </template>

    <template #stepHeader2>{{ 'Manage' }}</template>

    <template #stepItem2>
      <div class="text-center greycolor">
        <template>{{ 'Content type: ' }}</template>
        <span class="text-capitalize">{{ contentType }}</span>
      </div>

      <v-radio-group
        v-model="status"
        class="justify-center text-capitalize mt-2 pt-0"
        label="Status:"
        row
      >
        <v-radio
          v-for="statusOption in $options.static.statusOptions"
          :key="statusOption"
          :label="statusOption"
          :value="statusOption"
        ></v-radio>
      </v-radio-group>

      <ItemTable :content-type="contentType" :status="status" type="manage" />
    </template>
  </BaseStepper>
</template>

<script>
import { statusOptions } from '@/consts/fieldOptions'
import resetItem from '@/utils/resetItem'
import setupStepper from '@/utils/setupStepper'

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
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      status: 'submitted'
    }
  },
  watch: {
    contentType() {
      this.status = 'submitted'
    }
  },
  created() {
    setupStepper(this)
  },
  methods: {
    onNavigateBefore() {
      resetItem(this.$store)
    }
  },
  static: {
    statusOptions
  }
}
</script>
