import contentTypes from '@/consts/contentTypes'

export default vm => {
  vm.contentType = contentTypes[0]
  vm.contentTypes = contentTypes

  if (vm.$store.state.auth.role === 'Data Manager') {
    vm.contentType = 'datasets'
    vm.contentTypes = ['datasets']
  }
}
