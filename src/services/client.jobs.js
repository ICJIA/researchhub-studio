import client from './client'

export { createItem, deleteItem, updateItem, updateItemStatus }

async function createItem(contentType, item) {
  item.status = item.status || 'created'

  return await client
    .post(`/${contentType}`, item)
    .catch(err => console.log(err))
}

async function deleteItem(contentType, id) {
  return await client
    .delete(`/${contentType}/${id}`)
    .catch(err => console.log(err))
}

async function updateItem(contentType, item, id) {
  return await client
    .put(`/${contentType}/${id}`, item)
    .catch(err => console.log(err))
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
      console.log(err)
    })
}
