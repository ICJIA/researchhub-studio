export default {
  methods: {
    onMain() {
      if (this.update) {
        this.$store.dispatch('content/updateItem', this.contentType)
        alert('Item updated--back to home!')
      } else {
        this.$store.dispatch('content/createItem', this.contentType)
        alert('New item created--back to home!')
      }
      this.$router.push('/')
    },
    onReset() {
      this.resetItem(this.update)
      this.removeDropzoneFiles(this.dropzoneVm)
    }
  }
}
