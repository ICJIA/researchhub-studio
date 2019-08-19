import { fetchOneById, fetchListByStatus } from './client.utils'
import { baseFields, datasetFields } from '@/consts/queryFields'

export { fetchItemById, fetchItemsList }

/**
 * Fetch a dataset using id.
 * @param {String} id
 */
const fetchItemById = async id =>
  await fetchOneById({ contentType: 'dataset', id, fields: datasetFields })

/**
 * Fetch a list of datasets of status.
 * @param {String} status
 */
const fetchItemsList = async status =>
  await fetchListByStatus({
    contentType: 'datasets',
    fields: [...baseFields, 'project'],
    status
  })
