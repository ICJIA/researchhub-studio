import client from './client'
import { fetchData } from './client.utils'

export { createItem, deleteItem, updateItem, updateItemStatus, uploadFile }

/**
 * Create an item of the given content type with the payload.
 * @param {String} contentType
 * @param {Object} item
 */
const createItem = async (contentType, item) =>
  await client
    .post(`/${contentType}`, { ...item, status: item.status || 'created' })
    .catch(err => console.error(err))

/**
 * Delete an item of the given content type and id.
 * @param {String} contentType
 * @param {String} id
 */
const deleteItem = async (contentType, id) =>
  await client.delete(`/${contentType}/${id}`).catch(err => console.error(err))

/**
 * Update an item of the given content type and id with the payload.
 * @param {String} contentType
 * @param {String} id
 * @param {Object} item
 */
const updateItem = async (contentType, id, item) =>
  await client
    .put(`/${contentType}/${id}`, item)
    .catch(err => console.error(err))

/**
 * Update an item status.
 * @param {String} contentType
 * @param {String} id
 * @param {String} status
 */
const updateItemStatus = async (contentType, id, status) =>
  await client
    .post('/graphql', {
      query: buildUpdateQuery({
        contentType: contentType.slice(0, -1),
        params: `where: { id: "${id}" }`,
        key: 'status',
        value: status
      })
    })
    .catch(err => console.error(err))

/**
 * Uploads a file to the given content type item field.
 * @param {String} contentType
 * @param {String} field
 * @param {FormData} file
 * @param {String} id
 */
const uploadFile = async (contentType, field, file, id) => {
  const ref = contentType.slice(0, -1)
  const { data, status } = await getFileId({ contentType: ref, field, id })

  if (status === 200) {
    if (data[field]) await deleteFile(data[field].id)
    await postFile({ file, refId: id, ref, field })
  }
}

/**
 * Generate a graphql mutation update string.
 * @param {Object} args Mutate query information
 * @param {String} args.contentType
 * @param {String} args.params
 * @param {String} args.key
 * @param {String} args.value
 */
const buildUpdateQuery = ({ contentType, params, key, value }) =>
  `mutation {
    update${capitalize(contentType)} (input: {
      ${params},
      data: {
        ${key}: "${value}"
      }
    }) {
      ${contentType} {
        ${key}
      }
    }
  }`

/**
 * @param {String} str
 */
const capitalize = str => `${str[0].toUpperCase()}${str.slice(1)}`

/**
 * Delete an uploads file by id.
 * @param {String} id
 */
const deleteFile = async id =>
  await client.delete(`/upload/files/${id}`).catch(err => console.error(err))

/**
 * Get a related uploads file id for the given content type item field.
 * @param {Object} args
 * @param {String} args.contentType
 * @param {String} args.field
 * @param {String} args.type
 */
const getFileId = async ({ contentType, field, id }) =>
  await fetchData(contentType)({
    params: `id: "${id}"`,
    fields: [`${field} { id }`]
  })

/**
 * Post a uploads file for the given content type item field.
 * @param {Object} args Uploads file and information
 * @param {FormData} args.file FormData object to upload
 * @param {String} args.refId Content item id
 * @param {String} args.ref Content type
 * @param {String} args.field Field for the uploads file
 */
const postFile = async ({ file, refId, ref, field }) =>
  await client
    .post('/upload', prepareForm({ file, refId, ref, field }))
    .catch(err => console.error(err))

/**
 * Prepare a uploads file for the given content type item field.
 * @param {Object} args Uploads file and information
 * @param {FormData} args.file FormData object to upload
 * @param {String} args.refId Content item id
 * @param {String} args.ref Content type
 * @param {String} args.field Field for the uploads file
 */
const prepareForm = ({ file, refId, ref, field }) => {
  const form = new FormData()
  form.append('files', file)
  form.append('refId', refId)
  form.append('ref', ref)
  form.append('field', field)
  return form
}
