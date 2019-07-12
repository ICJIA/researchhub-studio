import { fetchData, buildQuery } from './client'

export { fetchItemById, fetchItemsList }

/**
 * Fetch a dataset using id.
 * @param {String} id
 */
async function fetchItemById(id) {
  const params = `id: "${id}"`
  const fields = getDatasetFields(false)
  const query = buildQuery('dataset', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.dataset : {},
    status: HTTPstatus
  }
}

/**
 * Fetch a list of datasets of status.
 * @param {String} status
 */
async function fetchItemsList(status) {
  const params = `sort: "date:desc", where: { status: "${status}" }`
  const fields = getDatasetFields(true)
  const query = buildQuery('datasets', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.datasets : [],
    status: HTTPstatus
  }
}

/**
 * Get dataset fields for building a query string.
 * @param {Boolean} isList
 */
function getDatasetFields(isList) {
  let fields = `
    _id
    title
    slug
    date`

  if (!isList) {
    fields = `
      ${fields}
      external
      categories
      tags
      sources
      timeperiod
      unit
      variables
      description
      notes
      citation
      funding
      datafile {
        name
        url
      }
      apps (sort: "date:desc", where: { status: "published" }) {
        _id
        title
        slug
      }
      articles (sort: "date:desc", where: { status: "published" }) {
        _id
        title
        slug
      }`
  }

  return fields
}
