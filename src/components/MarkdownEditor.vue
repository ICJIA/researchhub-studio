<template>
  <v-layout row wrap>
    <v-flex xs6>
      <h3>
        <template>{{ 'Markdown' }}</template>
        <small>
          <template>{{ ' (use ' }}</template>
          <a href="https://markdown.icjia.cloud/" target="_blank">
            <template>{{ 'ICJIA markdown editor' }}</template>
            <v-icon small>launch</v-icon>
          </a>
          <template>{{ ')' }}</template>
        </small>
      </h3>
      <v-textarea
        id="editor"
        ref="myEditor"
        height="400"
        v-model="markdown"
        box
        @scroll="syncScrollEditor"
        @input="onInput"
      >
      </v-textarea>
    </v-flex>

    <v-flex xs6>
      <h3>Result</h3>
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
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
}).use(require('markdown-it-footnote'))

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
  methods: {
    onInput(e) {
      this.$emit('update:markdown', e)
    },
    syncScrollEditor() {
      syncScroll(this.editor, this.preview)
    },
    syncScrollPreview() {
      syncScroll(this.preview, this.editor)
    }
  }
}
</script>

<style scoped>
#preview {
  font-family: 'Lato', sans-serif;
  height: 400px;
  overflow: auto;
  vertical-align: top;
  box-sizing: border-box;
  padding: 20px 15px;
  border: 1px solid #ccc;
}
</style>
