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
      <template v-if="type === 'post'">
        <v-radio-group v-if="contentType !== 'authors'" v-model="status" row>
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
      <v-flex class="no-shadow">
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
      </v-flex>
    </template>
  </BaseStepper>
</template>

<script>
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
      contentTypes:
        this.type === 'post'
          ? this.$store.state.content.typesAll
          : this.$store.state.content.types,
      contentType: 'apps',
      status: 'submitted',
      statusOptions: ['published', 'submitted', 'created'],
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
