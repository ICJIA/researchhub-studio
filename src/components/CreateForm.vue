<template>
  <BaseForm
    :contentType="contentType"
    :key="formKey"
    :formType="update ? 'update' : 'create'"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- common fields input 1 -->
      <v-layout row wrap>
        <v-flex class="px-3" xs12 sm10 md6 lg4>
          <v-text-field
            v-model="item.title"
            label="Title"
            counter
            :rules="[rules.required]"
            @keyup="titleToSlug"
          />
        </v-flex>

        <v-flex class="px-3" xs12 sm10 md6 lg4>
          <v-text-field
            v-model="item.slug"
            label="Slug"
            counter
            :hint="update ? '' : 'Automatically generated from title'"
            :readonly="!update"
            :disabled="update"
            :rules="[rules.required]"
          />
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex class="px-3" xs12 sm10 md6 lg4>
          <DatePicker :date.sync="item.date" />
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex class="px-3" xs12 sm10 md6 lg4>
          <v-select
            v-model="item.categories"
            label="Categories"
            clearable
            multiple
            :items="categoryOptions"
            :rules="[rules.required]"
          />
        </v-flex>

        <v-flex class="px-3" xs12 sm10 md6 lg4>
          <v-layout row wrap>
            <CreateFormExistingTags @useExistingTags="useExistingTags" />
            <v-text-field
              v-model="item.tagString"
              label="Tags"
              hint="Separate tags with commas"
            />
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- content type specific fields input  -->
      <CreateFormAppFields
        v-if="contentType === 'apps'"
        v-model="item"
        :rules="rules"
      >
        <template v-slot:image>
          <MyDropzone
            ref="DropzoneImage"
            fileTypes=".jpg, .jpeg, .png"
            :maxOne="true"
            :update="update"
          >
            <template v-slot:title>{{ 'Image' }}</template>
            <template v-slot:message>{{ dropzoneMsgImage }}</template>
          </MyDropzone>
        </template>
      </CreateFormAppFields>

      <CreateFormArticleFields
        v-if="contentType === 'articles'"
        v-model="item"
        :rules="rules"
        :update="update"
        @useExistingAuthors="useExistingAuthors"
      >
        <template v-slot:mainfile>
          <MyDropzone
            ref="DropzoneMainfile"
            fileTypes=".pdf"
            :maxOne="true"
            :update="update"
          >
            <template v-slot:title>{{ 'Main file' }}</template>
            <template v-slot:message>{{ dropzoneMsgPDF }}</template>
          </MyDropzone>
        </template>

        <template v-slot:extrafile>
          <MyDropzone ref="DropzoneExtrafile" :maxOne="true" :update="update">
            <template v-slot:title>{{ 'Extra file' }}</template>
            <template v-slot:message>{{ dropzoneMsgFile }}</template>
          </MyDropzone>
        </template>

        <template v-slot:splash>
          <MyDropzone
            ref="DropzoneSplash"
            fileTypes=".jpg, .jpeg, .png"
            :maxOne="true"
            :update="update"
          >
            <template v-slot:title>{{ 'Splash image' }}</template>
            <template v-slot:message>{{ dropzoneMsgImage }}</template>
          </MyDropzone>
        </template>

        <template v-slot:figures>
          <MyDropzone
            ref="DropzoneImages"
            fileTypes=".jpg, .jpeg, .png"
            :maxOne="false"
            :update="update"
          >
            <template v-slot:title>{{ 'Figures' }}</template>
            <template v-slot:message>{{ dropzoneMsgImages }}</template>
          </MyDropzone>
        </template>

        <template v-slot:articlebody>
          <MarkdownEditor
            :markdown.sync="item.markdown"
            :rules="[rules.required]"
          />
        </template>
      </CreateFormArticleFields>

      <CreateFormDatasetFields
        v-if="contentType === 'datasets'"
        v-model="item"
        :rules="rules"
        :update="update"
      >
        <template v-slot:datafile>
          <MyDropzone
            ref="DropzoneDatafile"
            fileTypes=".csv"
            :maxOne="true"
            :limitFilesize="false"
            :update="update"
          >
            <template v-slot:title>{{ 'Data file' }}</template>
            <template v-slot:message>{{ dropzoneMsgCsv }}</template>
          </MyDropzone>
        </template>
      </CreateFormDatasetFields>

      <!-- common fields input 2 -->
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md10 lg6>
          <v-textarea
            v-model="item.citation"
            label="Suggested citation"
            auto-grow
          />
        </v-flex>

        <v-flex class="px-3" xs12 md10 lg6>
          <v-textarea
            v-model="item.funding"
            label="Funding acknowledgement"
            auto-grow
          />
        </v-flex>
      </v-layout>

      <div style="height: 50px;"></div>

      <v-btn outline @click="onSave">Save</v-btn>
      <PreviewDialog
        v-if="saved"
        :key="previewKey"
        :contentType="contentType"
        :icon="false"
        :local="true"
        status="created"
      />
      <v-btn v-else outline disabled>Preview</v-btn>
    </v-form>
  </BaseForm>
</template>

<script>
import { mapState } from 'vuex'
import formMixin from '@/mixins/formMixin'

import dropzoneMsgs from '@/consts/dropzoneMsgs'
import emptyItem from '@/consts/emptyItem'
import { categoryOptions } from '@/consts/fieldOptions'

import addDropzoneFiles from '@/utils/addDropzoneFiles'
import getDropzoneFilelist from '@/utils/getDropzoneFilelist'
import getDropzoneList from '@/utils/getDropzoneList'
import parseItem from '@/utils/parseItem'
import prepareItem from '@/utils/prepareItem'
import removeDropzoneFiles from '@/utils/removeDropzoneFiles'

const BaseForm = () => import('@/components/BaseForm')
const CreateFormAppFields = () => import('@/components/CreateFormAppFields')
const CreateFormArticleFields = () =>
  import('@/components/CreateFormArticleFields')
const CreateFormDatasetFields = () =>
  import('@/components/CreateFormDatasetFields')
const CreateFormExistingTags = () =>
  import('@/components/CreateFormExistingTags')
const DatePicker = () => import('@/components/DatePicker')
const MarkdownEditor = () => import('@/components/MarkdownEditor')
const MyDropzone = () => import('@/components/MyDropzone')
const PreviewDialog = () => import('@/components/PreviewDialog')

const initItem = { ...emptyItem }

export default {
  name: 'createform',
  mixins: [formMixin],
  components: {
    BaseForm,
    CreateFormAppFields,
    CreateFormArticleFields,
    CreateFormDatasetFields,
    CreateFormExistingTags,
    DatePicker,
    MarkdownEditor,
    MyDropzone,
    PreviewDialog
  },
  props: {
    contentType: String,
    update: Boolean
  },
  data() {
    return {
      categoryOptions,
      dropzoneList: {},
      ...dropzoneMsgs,
      formKey: 0,
      item: { ...initItem },
      previewKey: 0,
      rules: {
        required: value => !!value || 'Required.',
        timeperiod: value =>
          /^\d{4}-\d{4}$/g.test(value) || 'Correct format: yyyy-yyyy'
      },
      saved: false,
      valid: false
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
        this.item = prepareItem(newContent)
        this.saved = true
      }
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
        ...parseItem(this.item),
        ...(await addDropzoneFiles(this.dropzoneList))
      }
    },
    rerenderForm() {
      this.formKey += 1
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
        this.item = { ...emptyItem }
      }

      removeDropzoneFiles(this.dropzoneList)
      this.rerenderForm()
      this.saved = false
    },
    saveFiles() {
      if (this.$refs.form.validate()) {
        const filelist = getDropzoneFilelist(this.dropzoneList)
        this.$store.dispatch('content/setFilelist', filelist)
      }
    },
    async saveItem() {
      if (this.$refs.form.validate()) {
        const item = await this.parseItem()
        this.$store.dispatch('content/setItem', item)
        await this.$nextTick()
        this.saved = true
        this.rerenderPreview()
      }
    },
    titleToSlug() {
      if (!this.update) {
        this.item.slug = this.item.title
          .replace(/[^\w\s-]/gi, '')
          .replace(/\s/gi, '-')
          .toLowerCase()
      }
    },
    useExistingTags(e) {
      this.item.tagString += this.item.tagString ? `, ${e}` : e
    },
    useExistingAuthors(e) {
      this.item.authorString += this.item.authorString ? `\n${e}` : e
    }
  }
}
</script>
