import { fetchData, fetchOneById } from './client.utils'

export { fetchItemById, fetchItemsList }

const fields = ['_id', 'title', 'slug']

/**
 * Fetch an author using id.
 * @param {String} id
 */
const fetchItemById = async id =>
  await fetchOneById({ contentType: 'author', id, fields })

/**
 * Fetch a list of authors.
 */
const fetchItemsList = async () =>
  await fetchData('authors')({ params: `sort: "title"`, fields })
