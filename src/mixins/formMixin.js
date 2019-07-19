export default {
  methods: {
    async onMain() {
      if (this.update) {
        await this.$store.dispatch('content/uploadFiles', this.contentType)
        await this.$store.dispatch('content/updateItem', this.contentType)
        alert('✔️Item updated--back to home!')
      } else {
        await this.$store.dispatch('content/createItem', this.contentType)
        alert('✔️New item created--back to home!')
      }

      this.$router.push('/')
    },
    onReset() {
      this.resetItem(this.update)
    },
    async onSave() {
      await this.saveItem()
      if (this.saved) {
        if (this.update) this.saveFiles()
        alert('✔️Changes saved. Try preview.')
      } else {
        alert('⚠️Missing required information!')
      }
    }
  }
}
