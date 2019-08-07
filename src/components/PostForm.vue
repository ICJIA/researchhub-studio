<template>
  <BaseForm
    :contentType="contentType"
    formType="post"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form>
      <v-layout class="pl-3" row wrap>
        <v-flex v-if="contentType !== 'authors'" class="px-3" xs12>
          <p class="greycolor">Status</p>
          <v-radio-group v-model="statusLocal" row>
            <v-radio
              v-for="status in statusOptions"
              :key="status"
              :label="status[0].toUpperCase() + status.slice(1)"
              :value="status"
            ></v-radio>
          </v-radio-group>
        </v-flex>

        <v-flex class="px-3 pt-3" xs12>
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
        </v-flex>

        <template v-if="contentType === 'apps'">
          <v-flex class="px-3 pt-3" xs12>
            <MyDropzone
              ref="DropzoneImage"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
            >
              <template v-slot:title>{{ 'Image' }}</template>
              <template v-slot:message>{{ dropzoneMsgImage }}</template>
            </MyDropzone>
          </v-flex>
        </template>

        <template v-if="contentType === 'articles'">
          <v-flex class="px-3 pt-3" xs12>
            <MyDropzone
              ref="DropzoneSplash"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
              :update="update"
            >
              <template v-slot:title>{{ 'Splash image' }}</template>
              <template v-slot:message>{{ dropzoneMsgImage }}</template>
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <MyDropzone
              key="DropzoneImages"
              ref="DropzoneImages"
              fileTypes=".jpg, .jpeg, .png"
              :update="update"
            >
              <template>{{ 'Figures' }}</template>
              <template>{{ dropzoneMsgImages }}</template>
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
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
          </v-flex>
        </template>

        <template v-if="contentType === 'datasets'">
          <v-flex class="px-3 pt-3" xs12>
            <MyDropzone
              key="DropzoneData"
              ref="DropzoneData"
              fileTypes=".csv"
              :maxOne="true"
              :limitFilesize="false"
              :update="update"
            >
              <tempalte v-slot:title>{{ 'Data file' }}</tempalte>
              <template v-slot:message>{{ dropzoneMsgCsv }}</template>
            </MyDropzone>
          </v-flex>
        </template>
      </v-layout>

      <div style="height: 50px;"></div>

      <v-btn outline @click="onSave">Save</v-btn>
      <PreviewDialog
        v-if="saved && contentType !== 'authors'"
        :key="previewKey"
        :contentType="contentType"
        :icon="false"
        :local="true"
      />
      <v-btn v-else outline disabled>Preview</v-btn>
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
