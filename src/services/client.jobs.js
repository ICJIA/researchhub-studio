import client, { fetchData, buildQuery } from './client'

export { createItem, deleteItem, updateItem, updateItemStatus, uploadFile }

async function createItem(contentType, item) {
  item.status = item.status || 'created'

  return await client
    .post(`/${contentType}`, item)
    .catch(err => console.error(err))
}

async function deleteItem(contentType, id) {
  return await client
    .delete(`/${contentType}/${id}`)
    .catch(err => console.error(err))
}

async function deleteFile(id) {
  return await client
    .delete(`/upload/files/${id}`)
    .catch(err => console.error(err))
}

async function getFileId(contentType, field, id) {
  const params = `id: "${id}"`
  const fields = `${field} { id }`
  const query = buildQuery(contentType.slice(0, -1), params, fields)

  return fetchData(query)
}

async function postFile(contentType, field, file, id) {
  const form = new FormData()

  form.append('files', file)
  form.append('refId', id)
  form.append('ref', contentType.slice(0, -1))
  form.append('field', field)

  return await client.post('/upload', form).catch(err => console.error(err))
}

async function updateItem(contentType, item, id) {
  return await client
    .put(`/${contentType}/${id}`, item)
    .catch(err => console.error(err))
}

async function updateItemStatus(contentType, id, status) {
  const type = contentType.slice(0, contentType.length - 1)
  const updateType = `update${type[0].toUpperCase()}${type.slice(1)}`

  return await client
    .post('/graphql', {
      query: `mutation {
        ${updateType}(input: {
          where: {
            id: "${id}"
          },
          data: {
            status: "${status}"
          }
        }) {
          ${type} {
            status
          }
        }
      }`
    })
    .catch(err => {
      console.error(err)
    })
}

async function uploadFile(contentType, field, file, id) {
  const [data, HTTPstatus] = await getFileId(contentType, field, id)

  if (HTTPstatus === 200) {
    const fileField = data[contentType.slice(0, -1)][field]
    if (fileField) {
      await deleteFile(fileField.id)
    }
    await postFile(contentType, field, file, id)
  }
}
