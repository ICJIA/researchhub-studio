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
            no-resize
          />
        </v-flex>

        <v-flex class="px-3" xs12 md10 lg6>
          <v-textarea
            v-model="item.funding"
            label="Funding acknowledgement"
            no-resize
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
import dropzoneMixin from '@/mixins/dropzoneMixin'
import formMixin from '@/mixins/formMixin'

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

const today = new Date().toISOString().substr(0, 10)
const emptyItem = {
  title: '',
  slug: '',
  date: today,
  categories: [],
  tags: [],
  tagString: '',
  markdown: '',
  abstract: null,
  authors: null,
  authorString: null,
  citation: null,
  description: null,
  funding: null,
  mainfiletype: '',
  notes: null,
  noteString: null,
  sources: null,
  sourceTitleString: null,
  sourceUrlString: null,
  timeperiod: null,
  timeperiodString: null,
  timeperiodType: null,
  thumbnail: null,
  variables: null,
  variableString: null,
  unit: null,
  url: null,
  apps: null,
  articles: null,
  datasets: null
}
const temporaryFields = [
  'authorString',
  'noteString',
  'sourceTitleString',
  'sourceUrlString',
  'tagString',
  'timeperiodString',
  'timeperiodType',
  'variableString'
]

export default {
  name: 'createform',
  mixins: [dropzoneMixin, formMixin],
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
      categoryOptions: [
        'corrections',
        'courts',
        'crimes',
        'law enforcement',
        'victimization',
        'other'
      ],
      dropzoneList: {},
      formKey: 0,
      item: { ...emptyItem },
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
        this.item = this.prepareItem(newContent)
        this.saved = true
      }
    }
  },
  mounted() {
    this.dropzoneList = this.getDropzonelist(this.contentType, this.$refs)
  },
  updated() {
    this.dropzoneList = this.getDropzonelist(this.contentType, this.$refs)
  },
  methods: {
    async parseItem() {
      const item = { ...this.item }

      item.markdown = this.contentType === 'articles' ? item.markdown : null
      item.authors = item.authorString
        ? this.parseAuthors(item.authorString)
        : []
      item.notes = item.noteString ? this.parseNotes(item.noteString) : []
      item.sources = item.sourceTitleString
        ? this.parseSources(item.sourceTitleString, item.sourceUrlString)
        : []
      item.tags = item.tagString ? this.stringToArray(item.tagString) : []
      item.timeperiod = item.timeperiodString
        ? this.parseTimeperiod(item.timeperiodType, item.timeperiodString)
        : null
      item.variables = item.variableString
        ? this.parseVariables(item.variableString)
        : []

      this.removeEmptyFields(item)
      this.removeTemporaryFields(item)
      await this.addDropzoneFiles(item, this.contentType, this.dropzoneList)

      return item
    },
    parseAuthors(string) {
      return string.split(/[\r\n]+/).map(author => {
        const [title, description] = author.split('|').map(el => el.trim())
        return { title, description }
      })
    },
    parseNotes(string) {
      return string
        .split(/[\r\n]+/)
        .map(el => el.trim())
        .filter(el => el)
    },
    parseSources(title, url) {
      const sourceTitles = this.stringToArray(title)
      const sourceUrls = this.stringToArray(url)
      return sourceTitles.map((title, i) => ({ title, url: sourceUrls[i] }))
    },
    parseTimeperiod(type, string) {
      return {
        yeartype: type,
        yearmin: string.split('-')[0],
        yearmax: string.split('-')[1]
      }
    },
    parseVariables(string) {
      return string.split(/[\r\n]+/).map(row => {
        const rowArr = this.stringToArray(row, '|')
        return {
          name: rowArr[0],
          type: rowArr[1],
          definition: rowArr[2],
          values: rowArr[3]
        }
      })
    },
    prepareItem(content) {
      const item = content
      item.date = item.date.slice(0, 10)
      item.tagString = item.tags ? item.tags.join(', ') : ''

      if (this.contentType === 'articles') this.prepareArticle(item)
      if (this.contentType === 'datasets') this.prepareDataset(item)

      return item
    },
    prepareArticle(item) {
      if (item.hasOwnProperty('authors')) {
        item.authorString = item.authors
          .map(({ title, description }) => `${title} | ${description}`)
          .join('\n')
      }
    },
    prepareDataset(item) {
      if (item.hasOwnProperty('timeperiod')) {
        item.timeperiodString =
          item.timeperiod.yearmin + '-' + item.timeperiod.yearmax
        item.timeperiodType = item.timeperiod.yeartype
      }

      if (item.hasOwnProperty('sources')) {
        item.sourceTitleString = item.sources.map(el => el.title).join(', ')
        item.sourceUrlString = item.sources.map(el => el.url).join(', ')
      }

      if (item.hasOwnProperty('notes')) {
        item.noteString = item.notes.join('\n')
      }

      if (item.hasOwnProperty('variables')) {
        item.variableString = ''
        item.variables.forEach((el, i, arr) => {
          item.variableString +=
            `${el.name} | ${el.type} ` + `| ${el.definition} | ${el.values}`
          if (i < arr.length - 1) item.variableString += '\n'
        })
      }
    },
    removeEmptyFields(item) {
      Object.keys(item).forEach(field => {
        if (item[field] === undefined || item[field] === null) {
          delete item[field]
        } else if (Array.isArray(item[field])) {
          item[field].forEach((val, i, arr) => {
            if (val === undefined) arr.splice(i, 1)
          })
        }
      })
    },
    removeTemporaryFields(item) {
      temporaryFields.forEach(field => delete item[field])
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

      this.removeDropzoneFiles(this.dropzoneList)
      this.rerenderForm()
      this.saved = false
    },
    saveFiles() {
      if (this.$refs.form.validate()) {
        const filelist = this.getDropzoneFilelist(this.dropzoneList)
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
    stringToArray(str, sep = ',') {
      return str.split(sep).map(el => el.trim())
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
      const add = this.item.tagString ? `, ${e}` : e
      this.item.tagString += add
    },
    useExistingAuthors(e) {
      const add = this.item.authorString ? `\n${e}` : e
      this.item.authorString += add
    }
  }
}
</script>
