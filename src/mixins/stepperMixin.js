export default {
  data() {
    return {
      contentType: 'apps',
      contentTypes: ['apps', 'articles', 'datasets']
    }
  },
  created() {
    if (this.$store.state.auth.role === 'Data Manager') {
      this.contentType = 'datasets'
      this.contentTypes = ['datasets']
    }
  },
  methods: {
    resetItem() {
      this.$store.dispatch('content/setItem', {})
      this.$store.dispatch('content/setItemId', '')
    }
  }
}
