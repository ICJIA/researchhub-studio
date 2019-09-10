<template>
  <BaseStepper :stepNumTotal="3" @stepper-navigate-before="navigateBefore">
    <template v-slot:stepHeader1>{{ 'Select content type' }}</template>

    <template v-slot:stepItem1>
      <ContentTypeSelector
        :contentTypes="contentTypes"
        :contentType.sync="contentType"
      />
    </template>

    <template v-slot:stepHeader2>{{ 'Select item' }}</template>

    <template v-slot:stepItem2>
      <div class="text-center greycolor">
        <template>{{ 'Content type: ' }}</template>
        <span class="text-capitalize">{{ contentType }}</span>
      </div>

      <template v-if="type === 'post'">
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

        <ItemTable type="update" :contentType="contentType" :status="status" />
      </template>

      <template v-if="type === 'create'">
        <ItemTable type="update" :contentType="contentType" status="created" />
      </template>
    </template>

    <template v-slot:stepHeader3>{{ 'Update' }}</template>

    <template v-slot:stepItem3>
      <v-col>
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
import { statusOptions } from '@/consts/fieldOptions'
import stepperMixin from '@/mixins/stepperMixin'

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
      this.resetItem()
    }
  },
  methods: {
    navigateBefore(step) {
      if (step.to === 2) this.resetItem()
    }
  }
}
</script>
