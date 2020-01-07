import NProgress from 'nprogress'

export default async ({ contentType, router, store, update }) => {
  if (update) {
    await store.dispatch(`content/uploadFiles`, contentType)

    handleSubmitResponse({
      res: await store.dispatch(`content/updateItem`, contentType),
      router,
      successMsg: 'Item updated'
    })
  } else {
    handleSubmitResponse({
      res: await store.dispatch(`content/createItem`, contentType),
      router,
      successMsg: 'New item created'
    })
  }
}

const handleSubmitResponse = ({ res, router, successMsg }) => {
  if (res.status === 413) {
    alert('️️️️⚠️Form is too large! Please try resizing/compressing images.')
    NProgress.done()
    return
  }

  if (res.status !== 200) {
    alert('️⚠️Something went wrong! Please try again--back to home!')
  } else {
    alert(`✔️${successMsg}--back to home!`)
  }
  router.push('/')
}
