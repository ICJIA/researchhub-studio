export default {
  methods: {
    async onMain() {
      if (this.update) {
        await this.$store.dispatch('content/uploadFiles', this.contentType)
        await this.$store.dispatch('content/updateItem', this.contentType)
        alert('Item updated--back to home!')
      } else {
        await this.$store.dispatch('content/createItem', this.contentType)
        alert('New item created--back to home!')
      }

      this.$router.push('/')
    },
    onReset() {
      this.resetItem(this.update)
    },
    async onSave() {
      this.saveItem()
      if (this.update) this.saveFiles()

      this.saved = true
      this.rerenderPreview()

      alert('Changes saved. Try preview.')
    }
  }
}
