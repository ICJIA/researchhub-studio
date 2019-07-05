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
          <v-radio-group v-model="status" row>
            <v-radio
              v-for="status in statusOptions"
              :key="status"
              :label="status[0].toUpperCase() + status.slice(1)"
              :value="status"
            ></v-radio>
          </v-radio-group>
        </v-flex>

        <v-flex class="px-3 pt-3" xs12>
          <BaseDropzoneTitle :update="update">JSON file</BaseDropzoneTitle>

          <MyDropzone
            key="DropzoneJson"
            ref="DropzoneJson"
            fileTypes=".json"
            :maxOne="true"
            :limitFilesize="false"
          >
            <template>{{ msgDropzoneJson }}</template>
          </MyDropzone>
        </v-flex>

        <template v-if="contentType === 'apps'">
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
        </template>

        <template v-if="contentType === 'articles'">
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

            <MyDropzone
              key="DropzoneImages"
              ref="DropzoneImages"
              fileTypes=".jpg, .jpeg, .png"
            >
              <template>{{ msgDropzoneImages }}</template>
            </MyDropzone>
          </v-flex>

          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">Article body</BaseDropzoneTitle>

            <MyDropzone
              key="DropzoneMarkdown"
              ref="DropzoneMarkdown"
              fileTypes=".md"
              :maxOne="true"
            >
              <template>{{ msgDropzoneMarkdown }}</template>
            </MyDropzone>
          </v-flex>
        </template>

        <template v-if="contentType === 'datasets'">
          <v-flex class="px-3 pt-3" xs12>
            <BaseDropzoneTitle :update="update">Data file</BaseDropzoneTitle>

            <MyDropzone
              key="DropzoneData"
              ref="DropzoneData"
              fileTypes=".csv"
              :maxOne="true"
              :limitFilesize="false"
            >
              <template>{{ msgDropzoneCsv }}</template>
            </MyDropzone>
          </v-flex>
        </template>
      </v-layout>

      <div style="height: 50px;"></div>

      <v-btn outline @click="saveItem">Save</v-btn>
      <PreviewDialog
        v-if="saved"
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

const BaseDropzoneTitle = () => import('@/components/BaseDropzoneTitle')
const BaseForm = () => import('@/components/BaseForm')
const MyDropzone = () => import('@/components/MyDropzone')
const PreviewDialog = () => import('@/components/PreviewDialog')

export default {
  name: 'postform',
  mixins: [dropzoneMixin, formMixin],
  components: {
    BaseDropzoneTitle,
    BaseForm,
    MyDropzone,
    PreviewDialog
  },
  props: {
    contentType: String,
    update: Boolean
  },
  data() {
    return {
      dropzoneList: {},
      item: {},
      status: 'published',
      statusOptions: ['published', 'submitted', 'created'],
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
    contentType() {
      this.resetItem(false)
    },
    content() {
      if (this.update) {
        this.item = this.content
        this.saved = true
      }
    }
  },
  mounted() {
    this.dropzoneList.json = this.$refs.DropzoneJson.$refs.MyDropzone
    switch (this.contentType) {
      case 'apps':
        this.dropzoneList.image = this.$refs.DropzoneImage.$refs.MyDropzone
        break
      case 'articles':
        this.dropzoneList.images = this.$refs.DropzoneImages.$refs.MyDropzone
        this.dropzoneList.markdown = this.$refs.DropzoneMarkdown.$refs.MyDropzone
        this.dropzoneList.splash = this.$refs.DropzoneSplash.$refs.MyDropzone
        break
      case 'datasets':
        this.dropzoneList.data = this.$refs.DropzoneData.$refs.MyDropzone
    }
  },
  updated() {
    this.dropzoneList = {}
    this.dropzoneList.json = this.$refs.DropzoneJson.$refs.MyDropzone
    switch (this.contentType) {
      case 'apps':
        this.dropzoneList.image = this.$refs.DropzoneImage.$refs.MyDropzone
        break
      case 'articles':
        this.dropzoneList.images = this.$refs.DropzoneImages.$refs.MyDropzone
        this.dropzoneList.markdown = this.$refs.DropzoneMarkdown.$refs.MyDropzone
        this.dropzoneList.splash = this.$refs.DropzoneSplash.$refs.MyDropzone
        break
      case 'datasets':
        this.dropzoneList.data = this.$refs.DropzoneData.$refs.MyDropzone
    }
  },
  methods: {
    async resetItem(update) {
      if (update) {
        await this.$store.dispatch('content/fetchItem', {
          contentType: this.contentType,
          id: this.contentId
        })
      } else {
        this.$store.dispatch('content/setItem', {})
        this.item = { status: 'publisehd' }
      }
      if (this.dropzoneList) this.removeDropzoneFiles(this.dropzoneList)
      this.saved = false
    },
    async saveItem() {
      let item = { ...this.item }
      if (!this.update) item.status = this.status

      await this.addDropzoneFiles(item, this.contentType, this.dropzoneList)

      this.$store.dispatch('content/setItem', item)
      this.saved = true

      alert('Changes saved. Try preview.')
    }
  }
}
</script>
