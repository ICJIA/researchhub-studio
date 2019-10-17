import NProgress from 'nprogress'

const dispatch = async (action, vm) =>
  await vm.$store.dispatch(`content/${action}`, vm.contentType)

const tryAction = (res, update) => {
  if (res.status === 413) {
    alert('️️️️⚠️Form is too large! Please try resizing/compressing images.')
    return false
  } else if (res.status !== 200) {
    alert('️⚠️Something went wrong! Please try again--back to home!')
  } else {
    alert(`✔️${update ? 'Item updated' : 'New item created'}--back to home!`)
  }
  return true
}

const tryCreate = async vm => tryAction(await dispatch('createItem', vm), false)

const tryUpdate = async vm => {
  await dispatch('uploadFiles', vm)
  return tryAction(await dispatch('updateItem', vm), true)
}

export default {
  methods: {
    async onMain() {
      const redirect = this.update
        ? await tryUpdate(this)
        : await tryCreate(this)

      if (redirect) this.$router.push('/')
      else NProgress.done()
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
