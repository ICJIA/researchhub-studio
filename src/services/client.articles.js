import { fetchOneById, fetchListByStatus } from './client.utils'
import { articleFields, baseFields } from '@/consts/queryFields'

export { fetchItemById, fetchItemsList }

/**
 * Fetch a dataset using id.
 * @param {String} id
 */
const fetchItemById = async id =>
  await fetchOneById({ contentType: 'article', id, fields: articleFields })

/**
 * Fetch a list of datasets of status.
 * @param {String} status
 */
const fetchItemsList = async status =>
  await fetchListByStatus({
    contentType: 'articles',
    fields: baseFields,
    status
  })
