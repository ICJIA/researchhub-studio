<template>
  <BaseStepper :stepNumTotal="2" @stepper-navigate-before="resetItem">
    <template v-slot:stepHeader1>{{ 'Select content type' }}</template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepHeader2>{{ 'Manage' }}</template>

    <template v-slot:stepItem2>
      <div class="text-center greycolor">
        <template>{{ 'Content type: ' }}</template>
        <span class="text-capitalize">{{ contentType }}</span>
      </div>

      <v-radio-group
        v-model="status"
        label="Status:"
        class="justify-center text-capitalize mt-2 pt-0"
        row
      >
        <v-radio
          v-for="status in statusOptions"
          :key="status"
          :label="status"
          :value="status"
        ></v-radio>
      </v-radio-group>

      <ItemTable type="manage" :contentType="contentType" :status="status" />
    </template>
  </BaseStepper>
</template>

<script>
import { statusOptions } from '@/consts/fieldOptions'
import stepperMixin from '@/mixins/stepperMixin'

const BaseStepper = () => import('@/components/BaseStepper')
const ContentTypeSelector = () => import('@/components/ContentTypeSelector')
const ItemTable = () => import('@/components/ItemTable')

export default {
  components: {
    BaseStepper,
    ContentTypeSelector,
    ItemTable
  },
  mixins: [stepperMixin],
  props: {
    type: String
  },
  data() {
    return {
      status: 'submitted',
      statusOptions
    }
  },
  watch: {
    contentType() {
      this.status = 'submitted'
    }
  }
}
</script>
