<template>
  <BaseForm
    :contentType="contentType"
    formType="create"
    @form-main="onMain"
    @form-reset="onReset"
  >
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.title"
            label="Title"
            counter
            :rules="[rules.required]"
            @keyup="titleToSlug"
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
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
        <v-flex class="px-3" xs12 md6 lg4>
          <DatePicker :date.sync="item.date" />
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex class="px-3" xs12 md6 lg4>
          <v-select
            v-model="item.categories"
            label="Categories"
            clearable
            multiple
            :items="categoryOptions"
            :rules="[rules.required]"
          />
        </v-flex>

        <v-flex class="px-3" xs12 md6 lg4>
          <v-text-field
            v-model="item.tagString"
            label="Tags"
            hint="Separate tags with commas"
          />
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <template v-if="contentType === 'apps'">
          <v-flex class="px-3" xs12 md6 lg4>
            <v-text-field
              v-model="item.url"
              label="URL"
              :rules="[rules.required]"
            />
          </v-flex>

          <v-flex xs12>
            <v-layout row wrap>
              <v-flex class="px-3" xs12 md6 lg4>
                <v-select
                  v-model="item.articles"
                  item-text="title"
                  label="Related articles"
                  clearable
                  multiple
                  return-object
                  :items="articleOptions"
                />
              </v-flex>

              <v-flex class="px-3" xs12 md6 lg4>
                <v-select
                  v-model="item.datasets"
                  item-text="title"
                  label="Related datasets"
                  clearable
                  multiple
                  return-object
                  :items="datasetOptions"
                />
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">Image</BaseDropzoneTitle>

            <MyDropzone
              ref="DropzoneImage"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
            >
              <template>{{ msgDropzoneImage }}</template>
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea
              v-model="item.description"
              label="Description"
              :rules="[rules.required]"
            />
          </v-flex>
        </template>

        <template v-if="contentType === 'articles'">
          <v-flex class="px-3" xs12 md6 lg4>
            <v-select
              v-model="item.authors"
              item-text="title"
              label="Authors"
              clearable
              multiple
              return-object
              :items="authorOptions"
              :rules="[rules.required]"
            />
          </v-flex>

          <v-flex xs12>
            <v-layout row wrap>
              <v-flex class="px-3" xs12 md6 lg4>
                <v-select
                  v-model="item.apps"
                  item-text="title"
                  label="Related apps"
                  clearable
                  multiple
                  return-object
                  :items="appOptions"
                />
              </v-flex>

              <v-flex class="px-3" xs12 md6 lg4>
                <v-select
                  v-model="item.datasets"
                  item-text="title"
                  label="Related datasets"
                  clearable
                  multiple
                  return-object
                  :items="datasetOptions"
                />
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">Splash image</BaseDropzoneTitle>

            <MyDropzone
              ref="DropzoneSplash"
              fileTypes=".jpg, .jpeg, .png"
              :maxOne="true"
            >
              <template>{{ msgDropzoneImage }}</template>
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">Figures</BaseDropzoneTitle>

            <MyDropzone ref="DropzoneImages" fileTypes=".jpg, .jpeg, .png">
              <template>{{ msgDropzoneImages }}</template>
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <p class="pt-2 greycolor">Article body</p>
            <MarkdownEditor
              :markdown.sync="item.markdown"
              :rules="[rules.required]"
            />
          </v-flex>

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea
              v-model="item.abstract"
              label="Abstract"
              :rules="[rules.required]"
            />
          </v-flex>
        </template>

        <template v-if="contentType === 'datasets'">
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex class="px-3" xs12 md6 lg4>
                <v-text-field
                  v-model="item.sourceTitleString"
                  label="Sources"
                  hint="Separate sources with commas"
                />
              </v-flex>

              <v-flex class="px-3" xs12 md6 lg4>
                <v-text-field
                  v-model="item.sourceUrlString"
                  label="Source URLs"
                  hint="Separate URLs with commas"
                />
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex xs12>
            <v-layout row wrap>
              <v-flex class="px-3" xs12 md6 lg4>
                <v-text-field
                  v-model="item.timeperiodString"
                  label="Time period"
                  hint="Format: yyyy-yyyy"
                  :rules="[rules.timeperiod]"
                />
              </v-flex>

              <v-flex class="px-3" xs12 md6 lg4>
                <v-select
                  v-model="item.timeperiodType"
                  label="Time period type"
                  clearable
                  :items="timeperiodOptions"
                />
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex class="px-3" xs12 md6 lg4>
            <v-select
              v-model="item.unit"
              label="Unit"
              clearable
              :items="unitOptions"
            />
          </v-flex>

          <v-flex xs12>
            <v-layout row wrap>
              <v-flex class="px-3" xs12 md6 lg4>
                <v-select
                  v-model="item.apps"
                  item-text="title"
                  label="Related apps"
                  clearable
                  multiple
                  return-object
                  :items="appOptions"
                />
              </v-flex>

              <v-flex class="px-3" xs12 md6 lg4>
                <v-select
                  v-model="item.articles"
                  item-text="title"
                  label="Related articles"
                  clearable
                  multiple
                  return-object
                  :items="articleOptions"
                />
              </v-flex>
            </v-layout>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">Data file</BaseDropzoneTitle>

            <MyDropzone
              ref="DropzoneData"
              fileTypes=".csv"
              :maxOne="true"
              :limitFilesize="false"
            >
              <template>{{ msgDropzoneCsv }}</template>
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea v-model="item.description" label="Description" />
          </v-flex>

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea
              v-model="item.noteString"
              label="Notes"
              hint="Separate notes with new lines"
            />
          </v-flex>

          <v-flex class="px-3" xs12 md10 lg6>
            <v-textarea
              v-model="item.variableString"
              label="Variables"
              placeholder=""
              hint="Format: name | type | definition | values; separate rows with new lines"
            />
          </v-flex>
        </template>
      </v-layout>

      <v-layout row wrap>
        <v-flex class="px-3" xs12 md10 lg6>
          <v-textarea v-model="item.citation" label="Suggested citation" />
        </v-flex>

        <v-flex class="px-3" xs12 md10 lg6>
          <v-textarea v-model="item.funding" label="Funding acknowledgement" />
        </v-flex>
      </v-layout>

      <div style="height: 50px;"></div>

      <v-btn outline @click="saveItem">Save</v-btn>
      <PreviewDialog
        v-if="saved"
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
import dropzoneMixin from '@/mixins/dropzoneMixin'
import formMixin from '@/mixins/formMixin'

import { fetchItemsList as fetchAppsList } from '@/services/client.apps.js'
import { fetchItemsList as fetchArticlesList } from '@/services/client.articles.js'
import { fetchItemsList as fetchAuthorsList } from '@/services/client.authors.js'
import { fetchItemsList as fetchDatasetsList } from '@/services/client.datasets.js'

const BaseDropzoneTitle = () => import('@/components/BaseDropzoneTitle')
const BaseForm = () => import('@/components/BaseForm')
const DatePicker = () => import('@/components/DatePicker')
const MyDropzone = () => import('@/components/MyDropzone')
const MarkdownEditor = () => import('@/components/MarkdownEditor')
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
  citation: null,
  description: null,
  funding: null,
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

export default {
  name: 'createform',
  mixins: [dropzoneMixin, formMixin],
  components: {
    BaseDropzoneTitle,
    BaseForm,
    DatePicker,
    MyDropzone,
    MarkdownEditor,
    PreviewDialog
  },
  props: {
    contentType: String,
    update: Boolean
  },
  data() {
    return {
      appOptions: [],
      articleOptions: [],
      authorOptions: [],
      datasetOptions: [],
      dropzoneList: {},
      item: { ...emptyItem },
      saved: false,
      valid: false,
      previewKey: 0
    }
  },
  computed: {
    ...mapState('content', {
      content: 'item',
      contentId: 'itemId',
      rules: 'rules'
    }),
    ...mapState('form', {
      agegroupOptions: 'agegroupOptions',
      categoryOptions: 'categoryOptions',
      timeperiodOptions: 'timeperiodOptions',
      typeOptions: 'typeOptions',
      unitOptions: 'unitOptions',
      rules: 'rules'
    })
  },
  watch: {
    contentType() {
      this.resetItem()
    },
    content(newContent, oldContent) {
      if (this.update && newContent && Object.keys(newContent).length) {
        this.item = newContent
        this.item.date = this.item.date.slice(0, 10)
        this.item.tagString = this.item.tags ? this.item.tags.join(', ') : ''

        if (this.item.hasOwnProperty('timeperiod')) {
          this.item.timeperiodString =
            this.item.timeperiod.yearmin + '-' + this.item.timeperiod.yearmax
          this.item.timeperiodType = this.item.timeperiod.yeartype
        }

        this.saved = true
      }
    }
  },
  async created() {
    this.authorOptions = (await fetchAuthorsList()).data
    this.appOptions = (await fetchAppsList('published')).data
    this.articleOptions = (await fetchArticlesList('published')).data
    this.datasetOptions = (await fetchDatasetsList('published')).data
  },
  mounted() {
    this.getDropzonelist()
  },
  updated() {
    this.dropzoneList = {}
    this.getDropzonelist()
  },
  methods: {
    getDropzonelist() {
      switch (this.contentType) {
        case 'apps':
          this.dropzoneList.image = this.$refs.DropzoneImage
            ? this.$refs.DropzoneImage.$refs.MyDropzone
            : null
          break
        case 'articles':
          this.dropzoneList.images = this.$refs.DropzoneImages
            ? this.$refs.DropzoneImages.$refs.MyDropzone
            : null
          this.dropzoneList.splash = this.$refs.DropzoneSplash
            ? this.$refs.DropzoneSplash.$refs.MyDropzone
            : null
          break
        case 'datasets':
          this.dropzoneList.data = this.$refs.DropzoneData
            ? this.$refs.DropzoneData.$refs.MyDropzone
            : null
      }
    },
    parseItem() {
      let item = { ...this.item }

      item.markdown = this.contentType === 'articles' ? item.markdown : null

      item.notes = this.item.noteString
        ? this.item.noteString
            .split(/[\r\n]+/)
            .map(el => el.trim())
            .filter(el => el)
        : []

      const sourceTitles = this.item.sourceTitleString
        ? this.item.sourceTitleString.split(',').map(el => el.trim())
        : []
      const sourceUrls = this.item.sourceUrlString
        ? this.item.sourceUrlString.split(',').map(el => el.trim())
        : []
      item.sources = sourceTitles
        ? sourceTitles.map((title, i) => ({ title, url: sourceUrls[i] }))
        : []

      item.tags = this.item.tagString
        ? this.item.tagString.split(',').map(el => el.trim())
        : []

      item.timeperiod = this.item.timeperiodString
        ? {
            yeartype: this.item.timeperiodType,
            yearmin: this.item.timeperiodString.split('-')[0],
            yearmax: this.item.timeperiodString.split('-')[1]
          }
        : null

      item.variables = this.item.variableString
        ? this.item.variableString.split(/[\r\n]+/).map(row => {
            const rowArr = row.split('|').map(el => el.trim())
            return {
              name: rowArr[0],
              type: rowArr[1],
              definition: rowArr[2],
              values: rowArr[3]
            }
          })
        : []

      delete item.noteString
      delete item.sourceTitleString
      delete item.sourceUrlString
      delete item.tagString
      delete item.timeperiodString
      delete item.timeperiodType
      delete item.variableString

      return item
    },
    removeEmptyProperties(obj) {
      Object.keys(obj).forEach(key => {
        if (obj[key] === undefined || obj[key] === null) {
          delete obj[key]
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((val, i, arr) => {
            if (val === undefined) arr.splice(i, 1)
          })
        }
      })
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

      if (this.dropzoneList) this.removeDropzoneFiles(this.dropzoneList)
      this.saved = false
      this.valid = false
    },
    async saveItem() {
      if (this.$refs.form.validate()) {
        let item = this.parseItem()

        this.removeEmptyProperties(item)
        await this.addDropzoneFiles(item, this.contentType, this.dropzoneList)

        this.$store.dispatch('content/setItem', item)
        this.saved = true
        this.rerenderPreview()

        alert('Changes saved. Try preview.')
      }
    },
    titleToSlug() {
      if (!this.update) {
        this.item.slug = this.item.title
          .replace(/[^\w\s-]/gi, '')
          .replace(/\s/gi, '-')
          .toLowerCase()
      }
    }
  }
}
</script>
