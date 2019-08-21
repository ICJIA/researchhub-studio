<template>
  <BaseForm
    :contentType="contentType"
    formType="post"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form>
      <v-row class="pl-4 pb-12">
        <v-col class="px-4" cols="10">
          <p class="greycolor">Status</p>
          <v-radio-group v-model="statusLocal" class="capitalize" row>
            <v-radio
              v-for="status in statusOptions"
              :key="status"
              :label="status"
              :value="status"
            ></v-radio>
          </v-radio-group>
        </v-col>

        <v-col class="px-4 pt-4" cols="10">
          <MyDropzone
            key="DropzoneJson"
            ref="DropzoneJson"
            fileTypes=".json"
            :maxOne="true"
            :limitFilesize="false"
            :update="update"
          >
            <template v-slot:title>{{ 'JSON file' }}</template>
            <template v-slot:message>{{ dropzoneMsgJson }}</template>
          </MyDropzone>
        </v-col>

        <template v-if="contentType === 'apps'">
          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              ref="DropzoneImage"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
            >
              <template v-slot:title>{{ 'Image' }}</template>
              <template v-slot:message>{{ dropzoneMsgImage }}</template>
            </MyDropzone>
          </v-col>
        </template>

        <template v-if="contentType === 'articles'">
          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              ref="DropzoneSplash"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
              :update="update"
            >
              <template v-slot:title>{{ 'Splash image' }}</template>
              <template v-slot:message>{{ dropzoneMsgImage }}</template>
            </MyDropzone>
          </v-col>

          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              key="DropzoneImages"
              ref="DropzoneImages"
              fileTypes=".jpg, .jpeg, .png"
              :update="update"
            >
              <template>{{ 'Figures' }}</template>
              <template>{{ dropzoneMsgImages }}</template>
            </MyDropzone>
          </v-col>

          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              key="DropzoneMarkdown"
              ref="DropzoneMarkdown"
              fileTypes=".md"
              :maxOne="true"
              :update="update"
            >
              <template v-slot:title>{{ 'Article body' }}</template>
              <template v-slot:message>{{ dropzoneMsgMarkdown }}</template>
            </MyDropzone>
          </v-col>
        </template>

        <template v-if="contentType === 'datasets'">
          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              key="DropzoneData"
              ref="DropzoneData"
              fileTypes=".csv"
              :maxOne="true"
              :limitFilesize="false"
              :update="update"
            >
              <template v-slot:title>{{ 'Data file' }}</template>
              <template v-slot:message>{{ dropzoneMsgCsv }}</template>
            </MyDropzone>
          </v-col>
        </template>
      </v-row>

      <v-btn class="mx-2" outlined @click="onSave">Save</v-btn>
      <PreviewDialog
        v-if="saved"
        :key="previewKey"
        :contentType="contentType"
        :icon="false"
        :local="true"
      />
      <v-btn v-else class="mx-2" outlined disabled>Preview</v-btn>
    </v-form>
  </BaseForm>
</template>

<script>
import { mapState } from 'vuex'
import formMixin from '@/mixins/formMixin'

import dropzoneMsgs from '@/consts/dropzoneMsgs'
import { statusOptions } from '@/consts/fieldOptions'

import addDropzoneFiles from '@/utils/addDropzoneFiles'
import getDropzoneFilelist from '@/utils/getDropzoneFilelist'
import getDropzoneList from '@/utils/getDropzoneList'
import removeDropzoneFiles from '@/utils/removeDropzoneFiles'

const BaseForm = () => import('@/components/BaseForm')
const MyDropzone = () => import('@/components/MyDropzone')
const PreviewDialog = () => import('@/components/PreviewDialog')

export default {
  name: 'postform',
  mixins: [formMixin],
  components: {
    BaseForm,
    MyDropzone,
    PreviewDialog
  },
  props: {
    contentType: String,
    status: String,
    update: Boolean
  },
  data() {
    return {
      dropzoneList: {},
      ...dropzoneMsgs,
      item: {},
      previewKey: 0,
      statusLocal: this.status,
      statusOptions,
      saved: false
    }
  },
  computed: {
    ...mapState('content', {
      content: 'item',
      contentId: 'itemId'
    })
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    content(newContent, _) {
      if (this.update && newContent && Object.keys(newContent).length) {
        this.item = newContent
        this.saved = true
      }
    },
    // eslint-disable-next-line no-unused-vars
    status(newStatus, _) {
      if (this.update && newStatus) this.statusLocal = newStatus
    }
  },
  mounted() {
    this.dropzoneList = getDropzoneList(this.$refs)
  },
  updated() {
    this.dropzoneList = getDropzoneList(this.$refs)
  },
  methods: {
    async parseItem() {
      return {
        ...this.item,
        ...(await addDropzoneFiles(this.dropzoneList)),
        ...(this.update ? { status: this.statusLocal } : {})
      }
    },
    rerenderPreview() {
      this.previewKey += 1
    },
    async resetItem() {
      if (this.update) {
        await this.$store.dispatch('content/fetchItem', {
          contentType: this.contentType,
          id: this.contentId
        })
      } else {
        this.$store.dispatch('content/setItem', {})
        this.item = { status: 'publisehd' }
      }
      if (this.dropzoneList) removeDropzoneFiles(this.dropzoneList)
      this.saved = false
    },
    saveFiles() {
      const filelist = getDropzoneFilelist(this.dropzoneList)
      this.$store.dispatch('content/setFilelist', filelist)
    },
    async saveItem() {
      const item = await this.parseItem()
      this.$store.dispatch('content/setItem', item)
      await this.$nextTick()
      this.saved = true
    }
  }
}
</script>
