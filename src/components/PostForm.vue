<template>
  <BaseForm
    :content-type="contentType"
    form-type="post"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form>
      <v-row class="pl-4 pb-12">
        <v-col class="px-4" cols="10">
          <p class="greycolor">Status</p>
          <v-radio-group v-model="statusLocal" class="text-capitalize" row>
            <v-radio
              v-for="statusOption in $options.static.statusOptions"
              :key="statusOption"
              :label="statusOption"
              :value="statusOption"
            ></v-radio>
          </v-radio-group>
        </v-col>

        <v-col class="px-4 pt-4" cols="10">
          <MyDropzone ref="DropzoneJson" file-types=".json" :update="update">
            <template #title>{{ 'JSON file' }}</template>
            <template #message>{{ $options.static.dropzoneMsgJson }}</template>
          </MyDropzone>
        </v-col>

        <template v-if="contentType === 'apps'">
          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone ref="DropzoneImage" file-types=".jpg, .jpeg, .png">
              <template #title>{{ 'Image' }}</template>
              <template #message>{{
                $options.static.dropzoneMsgImage
              }}</template>
            </MyDropzone>
          </v-col>
        </template>

        <template v-if="contentType === 'articles'">
          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              ref="DropzoneSplash"
              file-types=".jpg, .jpeg, .png"
              :update="update"
            >
              <template #title>{{ 'Splash image' }}</template>
              <template #message>{{
                $options.static.dropzoneMsgImage
              }}</template>
            </MyDropzone>
          </v-col>

          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              ref="DropzoneImages"
              file-types=".jpg, .jpeg, .png"
              :update="update"
            >
              <template #title>{{ 'Figures' }}</template>
              <template #message>{{
                $options.static.dropzoneMsgImages
              }}</template>
            </MyDropzone>
          </v-col>

          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              ref="DropzoneMarkdown"
              file-types=".md"
              :update="update"
            >
              <template #title>{{ 'Article body' }}</template>
              <template #message>{{
                $options.static.dropzoneMsgMarkdown
              }}</template>
            </MyDropzone>
          </v-col>
        </template>

        <template v-if="contentType === 'datasets'">
          <v-col class="px-4 pt-4" cols="10">
            <MyDropzone
              ref="DropzoneDatafile"
              file-types=".csv"
              :update="update"
            >
              <template #title>{{ 'Data file' }}</template>
              <template #message>{{ $options.static.dropzoneMsgCsv }}</template>
            </MyDropzone>
          </v-col>
        </template>
      </v-row>

      <v-btn class="mx-2" outlined @click="onSave">Save</v-btn>
      <PreviewDialog
        v-if="saved"
        :key="previewKey"
        :content-type="contentType"
        :icon="false"
        :local="true"
      />
      <v-btn v-else class="mx-2" disabled outlined>Preview</v-btn>
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
  components: {
    BaseForm,
    MyDropzone,
    PreviewDialog
  },
  mixins: [formMixin],
  props: {
    contentType: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    update: Boolean
  },
  data() {
    return {
      dropzoneList: {},
      item: {},
      previewKey: 0,
      statusLocal: this.status,
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
        status: this.statusLocal,
        ...this.item,
        ...(await addDropzoneFiles(this.dropzoneList))
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
      this.rerenderPreview()
    }
  },
  static: {
    ...dropzoneMsgs,
    statusOptions
  }
}
</script>
