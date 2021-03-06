<template>
  <BaseForm
    :key="formKey"
    :content-type="contentType"
    :form-type="update ? 'update' : 'create'"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form ref="form" v-model="valid" lazy-validation>
      <!-- common fields input 1 -->
      <v-row>
        <v-col class="px-4" cols="10" sm="8" lg="4">
          <v-text-field
            v-model="item.title"
            label="Title"
            counter
            :rules="[
              rules.noLeadingWhitespace,
              rules.noTrailingWhitespace,
              rules.required
            ]"
            @keyup="titleToSlug"
          />
        </v-col>

        <v-col class="px-4" cols="10" sm="8" lg="4">
          <v-text-field
            v-model="item.slug"
            label="Slug"
            counter
            :hint="update ? '' : 'Automatically generated from title'"
            :readonly="!update"
            :disabled="update"
            :rules="[rules.required]"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-4" cols="10" sm="8" lg="4">
          <DatePicker :date.sync="item.date" />
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-4" cols="10" sm="8" lg="4">
          <v-select
            v-model="item.categories"
            label="Categories"
            clearable
            multiple
            :items="$options.static.categoryOptions"
            :rules="[rules.required]"
          />
        </v-col>

        <v-col class="pl-1 pr-4" cols="10" sm="8" lg="4">
          <v-row no-gutters>
            <CreateFormExistingTags @useExistingTags="useExistingTags" />
            <v-text-field
              v-model="item.tagString"
              label="Tags"
              hint="Separate tags with commas"
            />
          </v-row>
        </v-col>
      </v-row>

      <!-- content type specific fields input  -->
      <CreateFormAppFields
        v-if="contentType === 'apps'"
        v-model="item"
        :rules="rules"
      >
        <template #image>
          <MyDropzone
            ref="DropzoneImage"
            file-types=".jpg, .jpeg, .png"
            :update="update"
          >
            <template #title>{{ 'Image' }}</template>
            <template #message>{{ $options.static.dropzoneMsgImage }}</template>
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
        <template #mainfile>
          <MyDropzone
            ref="DropzoneMainfile"
            file-types=".pdf"
            :max-filesize="5"
            :update="update"
          >
            <template #title>{{ 'Main file' }}</template>
            <template #message>{{ $options.static.dropzoneMsgPDF }}</template>
          </MyDropzone>
        </template>

        <template #extrafile>
          <MyDropzone
            ref="DropzoneExtrafile"
            :max-filesize="10"
            :update="update"
          >
            <template #title>{{ 'Extra file' }}</template>
            <template #message>{{ $options.static.dropzoneMsgFile }}</template>
          </MyDropzone>
        </template>

        <template #splash>
          <MyDropzone
            ref="DropzoneSplash"
            file-types=".jpg, .jpeg, .png"
            :max-filesize="0.5"
            :update="update"
          >
            <template #title>{{ 'Splash image' }}</template>
            <template #message>{{ $options.static.dropzoneMsgImage }}</template>
          </MyDropzone>
        </template>

        <template #figures>
          <MyDropzone
            ref="DropzoneImages"
            file-types=".jpg, .jpeg, .png"
            :max-filesize="0.1"
            :multiple-files="true"
            :update="update"
          >
            <template #title>{{ 'Figures' }}</template>
            <template #message>{{
              $options.static.dropzoneMsgImages
            }}</template>
          </MyDropzone>
        </template>

        <template #articlebody>
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
        <template #datafile>
          <MyDropzone
            ref="DropzoneDatafile"
            file-types=".csv"
            :max-filesize="100"
            :update="update"
          >
            <template #title>{{ 'Data file' }}</template>
            <template #message>{{ $options.static.dropzoneMsgCsv }}</template>
          </MyDropzone>
        </template>
      </CreateFormDatasetFields>

      <!-- common fields input 2 -->
      <v-row class="pb-12">
        <v-col class="px-4" cols="10" sm="8" lg="5">
          <v-textarea
            v-model="item.citation"
            label="Suggested citation"
            auto-grow
          />
        </v-col>

        <v-col class="px-4" cols="10" sm="8" lg="5">
          <v-textarea
            v-model="item.funding"
            label="Funding acknowledgement"
            auto-grow
          />
        </v-col>

        <v-col v-if="contentType === 'articles'" class="px-4" cols="12">
          <v-col class="pa-0" cols="10" sm="8" lg="4">
            <v-text-field v-model="item.doi" label="DOI" />
          </v-col>
        </v-col>

        <v-col v-if="contentType !== 'apps'" class="px-4" cols="12">
          <v-col class="pa-0" cols="10" sm="8" lg="4">
            <v-select
              v-model="item.apps"
              item-text="title"
              label="Related apps"
              clearable
              multiple
              return-object
              :items="appOptions"
            />
          </v-col>
        </v-col>

        <v-col v-if="contentType !== 'articles'" class="px-4" cols="12">
          <v-col class="pa-0" cols="10" sm="8" lg="4">
            <v-select
              v-model="item.articles"
              item-text="title"
              label="Related articles"
              clearable
              multiple
              return-object
              :items="articleOptions"
            />
          </v-col>
        </v-col>

        <v-col v-if="contentType !== 'datasets'" class="px-4" cols="12">
          <v-col class="pa-0" cols="10" sm="8" lg="4">
            <v-select
              v-model="item.datasets"
              item-text="title"
              label="Related datasets"
              clearable
              multiple
              return-object
              :items="datasetOptions"
            />
          </v-col>
        </v-col>
      </v-row>

      <v-btn class="mx-2" outlined @click="onSave">Save</v-btn>
      <PreviewDialog
        v-if="saved"
        :key="previewKey"
        :content-type="contentType"
        :icon="false"
        :local="true"
        status="created"
      />
      <v-btn v-else class="mx-2" outlined disabled>Preview</v-btn>
    </v-form>
  </BaseForm>
</template>

<script>
import { mapState } from 'vuex'

import dropzoneMsgs from '@/consts/dropzoneMsgs'
import emptyItem from '@/consts/emptyItem'
import { categoryOptions } from '@/consts/fieldOptions'

import { fetchItemsList as fetchAppsList } from '@/services/client.apps'
import { fetchItemsList as fetchArticlesList } from '@/services/client.articles'
import { fetchItemsList as fetchDatasetsList } from '@/services/client.datasets'

import addDropzoneFiles from '@/utils/addDropzoneFiles'
import getDropzoneFilelist from '@/utils/getDropzoneFilelist'
import getDropzoneList from '@/utils/getDropzoneList'
import parseItem from '@/utils/parseItem'
import prepareItem from '@/utils/prepareItem'
import removeDropzoneFiles from '@/utils/removeDropzoneFiles'
import submitForm from '@/utils/submitForm'

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
  name: 'Createform',
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
    contentType: {
      type: String,
      default: ''
    },
    update: Boolean
  },
  data() {
    return {
      appOptions: [],
      articleOptions: [],
      datasetOptions: [],
      dropzoneList: {},
      formKey: 0,
      item: { ...initItem },
      previewKey: 0,
      rules: {
        noLeadingWhitespace: value =>
          value.charAt(0) !== ' ' || 'Delete leading whitespace.',
        noTrailingWhitespace: value =>
          value.slice(-1) !== ' ' || 'Delete trailing whitespace.',
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
  async created() {
    this.appOptions = (await fetchAppsList('published')).data
    this.articleOptions = (await fetchArticlesList('published')).data
    this.datasetOptions = (await fetchDatasetsList('published')).data
  },
  mounted() {
    this.dropzoneList = getDropzoneList(this.$refs)
  },
  updated() {
    this.dropzoneList = getDropzoneList(this.$refs)
  },
  methods: {
    async onMain() {
      await submitForm({
        contentType: this.contentType,
        router: this.$router,
        store: this.$store,
        update: this.update
      })
    },
    async onReset() {
      if (this.update) {
        await this.$store.dispatch('content/fetchItem', {
          contentType: this.contentType,
          id: this.contentId
        })
      } else {
        this.$store.dispatch('content/setItem', {})
        this.item = { ...initItem }
      }

      removeDropzoneFiles(this.dropzoneList)
      this.rerenderForm()
      this.saved = false
    },
    async onSave() {
      await this.saveItem()
      if (this.saved) {
        if (this.update) this.saveFiles()
        alert('✔️Changes saved. Try preview.')
      } else {
        alert('⚠️Missing required information!')
      }
    },
    rerenderForm() {
      this.formKey += 1
    },
    rerenderPreview() {
      this.previewKey += 1
    },
    saveFiles() {
      if (this.$refs.form.validate()) {
        const filelist = getDropzoneFilelist(this.dropzoneList)
        this.$store.dispatch('content/setFilelist', filelist)
      }
    },
    async saveItem() {
      if (this.$refs.form.validate()) {
        const item = {
          ...parseItem(this.item),
          ...(await addDropzoneFiles(this.dropzoneList))
        }
        this.$store.dispatch('content/setItem', item)
        await this.$nextTick()
        this.saved = true
        this.rerenderPreview()
      }
    },
    titleToSlug() {
      if (!this.update) {
        this.item.slug = this.item.title
          .replace(/[\s/]/gi, '-')
          .replace(/[^\w-]/gi, '')
          .toLowerCase()
      }
    },
    useExistingTags(e) {
      this.item.tagString += this.item.tagString ? `, ${e}` : e
    },
    useExistingAuthors(e) {
      const { authorString } = this.item
      this.item.authorString = authorString ? `${authorString}\n${e}` : e
    }
  },
  static: {
    categoryOptions,
    ...dropzoneMsgs
  }
}
</script>
