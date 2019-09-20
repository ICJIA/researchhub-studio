<template>
  <div>
    <p class="greycolor">
      <slot name="title"></slot>
      <span v-if="update"> (No change if not provided)</span>
    </p>

    <BaseDropzone
      id="dropzone"
      ref="MyDropzone"
      :duplicate-check="true"
      :options="dropzoneOptions"
      @vdropzone-file-added="vfileAdded"
      @vdropzone-error="verror"
      @vdropzone-removed-file="vremoved"
      @vdropzone-total-upload-progress="vprogress"
      @vdropzone-mounted="vmounted"
      @vdropzone-duplicate-file="vdduplicate"
    >
      <slot name="message"></slot>
    </BaseDropzone>
  </div>
</template>

<script>
/* eslint no-unused-vars: "off" */
const BaseDropzone = () => import('@/components/BaseDropzone')

export default {
  components: {
    BaseDropzone
  },
  props: {
    fileTypes: {
      type: String,
      default: ''
    },
    maxFilesize: {
      type: Number,
      default: 0
    },
    multipleFiles: {
      type: Boolean,
      default: false
    },
    update: Boolean
  },
  data() {
    return {
      fileAdded: false,
      error: false,
      removedFile: false,
      uploadProgress: false,
      progress: false,
      myProgress: 0,
      isMounted: false,
      dDuplicate: false
    }
  },
  computed: {
    dropzoneOptions() {
      let options = {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 150,
        acceptedFiles: this.fileTypes,
        addRemoveLinks: true,
        autoProcessQueue: false,
        accept(file, done) {
          done()
        }
      }
      if (!this.multipleFiles) options.maxFiles = 1
      if (this.maxFilesize) options.maxFilesize = this.maxFilesize

      return options
    }
  },
  watch: {
    fileAdded() {
      let that = this
      setTimeout(function() {
        that.fileAdded = false
      }, 2000)
    },
    error() {
      let that = this
      setTimeout(function() {
        that.error = false
      }, 2000)
    },
    removedFile() {
      let that = this
      setTimeout(function() {
        that.removedFile = false
      }, 2000)
    },
    progress() {
      let that = this
      setTimeout(function() {
        that.progress = false
      }, 2000)
    },
    isMounted() {
      let that = this
      setTimeout(function() {
        that.isMounted = false
      }, 2000)
    },
    dDuplicate() {
      let that = this
      setTimeout(function() {
        that.dDuplicate = false
      }, 2000)
    }
  },
  methods: {
    vfileAdded(file) {
      this.fileAdded = true
      this.$refs.MyDropzone.$el.querySelector('.dz-progress').remove()
    },
    verror(file) {
      this.error = true
    },
    vremoved(file, xhr, error) {
      this.removedFile = true
    },
    vprogress(totalProgress, totalBytes, totalBytesSent) {
      this.progress = true
      this.myProgress = Math.floor(totalProgress)
    },
    vmounted() {
      this.isMounted = true
    },
    vdduplicate() {
      this.dDuplicate = true
    }
  }
}
</script>
