<template>
  <BaseStepper :step-num-total="3" @stepper-navigate-before="onNavigateBefore">
    <template #stepHeader1>{{ 'Select content type' }}</template>

    <template #stepItem1>
      <ContentTypeSelector
        :content-types="contentTypes"
        :content-type.sync="contentType"
      />
    </template>

    <template #stepHeader2>{{ 'Select item' }}</template>

    <template #stepItem2>
      <div class="text-center greycolor">
        <template>{{ 'Content type: ' }}</template>
        <span class="text-capitalize">{{ contentType }}</span>
      </div>

      <template v-if="type === 'post'">
        <v-row justify="center" no-gutters>
          <v-radio-group
            v-model="status"
            label="Status:"
            class="text-capitalize mt-2 pt-0"
            row
          >
            <v-radio
              v-for="statusOption in $options.static.statusOptions"
              :key="statusOption"
              :label="statusOption"
              :value="statusOption"
            ></v-radio>
          </v-radio-group>
        </v-row>

        <ItemTable type="update" :content-type="contentType" :status="status" />
      </template>

      <template v-if="type === 'create'">
        <ItemTable type="update" :content-type="contentType" status="created" />
      </template>
    </template>

    <template #stepHeader3>{{ 'Update' }}</template>

    <template #stepItem3>
      <v-col>
        <CreateForm
          v-if="type === 'create'"
          :content-type="contentType"
          :update="true"
        />

        <PostForm
          v-if="type === 'post'"
          :content-type="contentType"
          :status="status"
          :update="true"
        />
      </v-col>
    </template>
  </BaseStepper>
</template>

<script>
import { statusOptions } from '@/consts/fieldOptions'
import resetItem from '@/utils/resetItem'
import setupStepper from '@/utils/setupStepper'

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
      resetItem(this.$store)
    }
  },
  created() {
    setupStepper(this)
  },
  methods: {
    onNavigateBefore(step) {
      if (step.to === 2) resetItem(this.$store)
    }
  },
  static: {
    statusOptions
  }
}
</script>
