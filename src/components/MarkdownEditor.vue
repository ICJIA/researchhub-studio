<template>
  <!-- eslint-disable vue/no-v-html -->
  <v-row no-gutters>
    <v-col cols="12" lg="6">
      <span class="greycolor small">
        <template>{{ 'Markdown' }}</template>
        <template>{{ ' (Use ' }}</template>
        <a href="https://markdown.icjia.cloud/" target="_blank">
          <template>{{ 'ICJIA markdown editor' }}</template>
          <v-icon small>{{ $options.static.mdiOpenInNew }}</v-icon>
        </a>
        <template>{{ ') :' }}</template>
      </span>
      <v-textarea
        id="editor"
        ref="myEditor"
        v-model="markdownLocal"
        height="400"
        filled
        no-resize
        @scroll="syncScrollEditor"
        @input="onInput"
      >
      </v-textarea>
    </v-col>

    <v-col class="hidden-md-and-down" cols="6">
      <span class="greycolor small">HTML Preview :</span>
      <div
        id="preview"
        ref="myPreview"
        @scroll="syncScrollPreview"
        v-html="compiledMarkdown"
      ></div>
    </v-col>
  </v-row>
</template>

<script>
import { mdiOpenInNew } from '@mdi/js'
import { initTexmath } from 'researchhub-lib/src/utils/texmath'

const mdOpts = {
  html: true,
  linkify: true,
  typographer: true
}

const mdLinkAttrOpts = {
  attrs: {
    target: '_blank'
  }
}

const mdMultimdTableOpts = {
  enableMultilineRows: true,
  enableRowspan: true
}

const md = require('markdown-it')(mdOpts)
  .use(require('markdown-it-footnote'))
  .use(require('markdown-it-link-attributes'), mdLinkAttrOpts)
  .use(require('markdown-it-multimd-table'), mdMultimdTableOpts)

function syncScroll(from, to) {
  let sf = from.scrollHeight - from.clientHeight

  if (sf < 1) return

  let st = to.scrollHeight - to.clientHeight
  let p = (from.scrollTop / sf) * 100

  to.scrollTop = (st / 100) * p
}

export default {
  props: {
    markdown: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      markdownLocal: null
    }
  },
  computed: {
    compiledMarkdown() {
      return md.render(this.markdown)
    },
    editor() {
      return this.$refs.myEditor.$el.querySelector('#editor')
    },
    preview() {
      return this.$refs.myPreview
    }
  },
  async created() {
    await initTexmath()
    // eslint-disable-next-line no-undef
    md.use(texmath.use(katex))
  },
  mounted() {
    this.markdownLocal = this.markdown
  },
  updated() {
    this.markdownLocal = this.markdown
  },
  methods: {
    onInput(e) {
      this.$emit('update:markdown', e)
    },
    syncScrollEditor() {
      syncScroll(this.editor, this.preview)
    },
    syncScrollPreview() {
      syncScroll(this.preview, this.editor)
    },
    updateMarkdown() {
      this.$emit('update:markdown', this.markdownLocal)
    }
  },
  static: {
    mdiOpenInNew
  }
}
</script>

<style scoped>
#preview {
  font-family: 'Gentium Book Basic', serif;
  height: 400px;
  overflow: auto;
  vertical-align: top;
  box-sizing: border-box;
  padding: 20px 15px;
  border: 1px solid #ccc;
}

#preview >>> h2,
#preview >>> h3,
#preview >>> h4,
#preview >>> h5 {
  font-family: 'Oswald', sans-serif;
  line-height: 1.3;
  margin-bottom: 11px;
}

#preview >>> h4,
#preview >>> h5,
#preview >>> h6 {
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 700;
  margin-bottom: 11px;
  margin-top: 11px;
}

#preview >>> h2 {
  font-size: 1.7em;
}

#preview >>> h3 {
  font-size: 1.2em;
}

#preview >>> h4 {
  font-size: 0.85em;
}

#preview >>> h5 {
  font-size: 0.7em;
}

#preview >>> h6 {
  font-family: 'Lato', sans-serif;
  font-size: 0.65em;
}

#preview >>> .article-figure,
#preview >>> .article-table {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding: 1.2em 0.6em;
}

#preview >>> blockquote {
  background-color: #ebf6ff;
  border-left: 0.25em solid #466c8c;
  font-family: 'Lato', sans-serif;
  color: #466c8c;
  padding: 1em 2em;
  margin: 2em 0;
}

#preview >>> blockquote p,
#preview >>> blockquote ol,
#preview >>> blockquote ul {
  text-indent: 0;
}

#preview >>> blockquote > :first-child {
  margin-top: 0;
}

#preview >>> blockquote > :last-child {
  margin-bottom: 0;
}

#preview >>> table {
  border-collapse: collapse;
  border-spacing: 0;
  margin-left: auto;
  margin-right: auto;
}

#preview >>> table td,
#preview >>> table th {
  border: 1px solid grey;
  padding: 6px 13px;
}

#preview >>> table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

#preview >>> table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

#preview >>> .katex {
  font-size: 1em;
}
</style>
