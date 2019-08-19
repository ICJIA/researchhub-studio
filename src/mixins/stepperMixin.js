export default {
  created() {
    if (this.$store.state.auth.role === 'Data Manager') {
      this.contentType = 'datasets'
      this.contentTypes = ['datasets']
    }
  }
}
