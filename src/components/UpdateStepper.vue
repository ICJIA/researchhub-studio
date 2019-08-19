<template>
  <BaseStepper :stepNumTotal="3" @stepper-navigate-before="navigateBefore">
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

      <template v-if="type === 'post'">
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

        <ItemTable type="update" :contentType="contentType" :status="status" />
      </template>

      <template v-if="type === 'create'">
        <ItemTable type="update" :contentType="contentType" status="created" />
      </template>
    </template>

    <template v-slot:stepHeader3>{{ stepHeader3 }}</template>

    <template v-slot:stepItem3>
      <v-col class="no-shadow">
        <CreateForm
          v-if="type === 'create'"
          :contentType="contentType"
          :update="true"
        />

        <PostForm
          v-if="type === 'post'"
          :contentType="contentType"
          :status="status"
          :update="true"
        />
      </v-col>
    </template>
  </BaseStepper>
</template>

<script>
import contentTypes from '@/consts/contentTypes'
import { statusOptions } from '@/consts/fieldOptions'

const BaseStepper = () => import('@/components/BaseStepper')
const ContentTypeSelector = () => import('@/components/ContentTypeSelector')
const CreateForm = () => import('@/components/CreateForm')
const ItemTable = () => import('@/components/ItemTable')
const PostForm = () => import('@/components/PostForm')

export default {
  components: {
    BaseStepper,
    ContentTypeSelector,
    CreateForm,
    ItemTable,
    PostForm
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
      stepHeader2: 'Select item',
      stepHeader3: 'Update'
    }
  },
  watch: {
    contentType() {
      this.status = 'submitted'
      this.resetItem()
    }
  },
  methods: {
    navigateBefore(step) {
      if (step.to === 2) this.resetItem()
    },
    resetItem() {
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
