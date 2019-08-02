<template>
  <v-layout row wrap>
    <v-flex xs6>
      <span>
        <template>{{ 'Markdown' }}</template>
        <template>{{ ' (Use ' }}</template>
        <a href="https://markdown.icjia.cloud/" target="_blank">
          <template>{{ 'ICJIA markdown editor' }}</template>
          <v-icon small>launch</v-icon>
        </a>
        <template>{{ ') :' }}</template>
      </span>
      <v-textarea
        id="editor"
        ref="myEditor"
        height="400"
        v-model="markdownLocal"
        box
        @scroll="syncScrollEditor"
        @input="onInput"
      >
      </v-textarea>
    </v-flex>

    <v-flex xs6>
      <span>Result :</span>
      <div
        id="preview"
        ref="myPreview"
        v-html="compiledMarkdown"
        @scroll="syncScrollPreview"
      ></div>
    </v-flex>
  </v-layout>
</template>

<script>
import MarkdownItTexmath from 'markdown-it-texmath'

const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
}).use(require('markdown-it-footnote'))

const loadFromCDN = (tagName, attrs) => {
  const el = document.createElement(tagName)
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]))
  document.head.appendChild(el)

  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => el.addEventListener('load', resolve))
}

function syncScroll(from, to) {
  let sf = from.scrollHeight - from.clientHeight

  if (sf < 1) return

  let st = to.scrollHeight - to.clientHeight
  let p = (from.scrollTop / sf) * 100

  to.scrollTop = (st / 100) * p
}

export default {
  props: {
    markdown: String
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
    if (!document.head.querySelector('#katexCSS'))
      await loadFromCDN('link', {
        id: 'katexCSS',
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.css',
        integrity:
          'sha384-yFRtMMDnQtDRO8rLpMIKrtPCD5jdktao2TV19YiZYWMDkUR5GQZR/NOVTdquEx1j',
        crossorigin: 'anonymous'
      })

    if (!document.head.querySelector('#katexJS'))
      await loadFromCDN('script', {
        id: 'katexJS',
        src: 'https://cdn.jsdelivr.net/npm/katex@0.10.2/dist/katex.min.js',
        integrity:
          'sha384-9Nhn55MVVN0/4OFx7EE5kpFBPsEMZxKTCnA+4fqDmg12eCTqGi6+BB2LjY8brQxJ',
        crossorigin: 'anonymous'
      })

    // eslint-disable-next-line no-undef
    md.use(MarkdownItTexmath.use(katex))
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
  }
}
</script>

<style scoped>
#preview {
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
