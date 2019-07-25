import { fetchOneById, fetchListByStatus } from './client.utils'
import { appFields } from '@/consts/queryFields'

export { fetchItemById, fetchItemsList }

/**
 * Fetch a dataset using id.
 * @param {String} id
 */
const fetchItemById = async id =>
  await fetchOneById({ contentType: 'app', id, fields: appFields })

/**
 * Fetch a list of datasets of status.
 * @param {String} status
 */
const fetchItemsList = async status =>
  await fetchListByStatus({ contentType: 'apps', status })
