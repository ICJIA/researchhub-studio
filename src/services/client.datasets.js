import { fetchData, buildQuery } from './client'

export { fetchItemById, fetchItemsList, fetchDataById }

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
    data: data ? data.dataset : null,
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
    data: data ? data.datasets : null,
    status: HTTPstatus
  }
}

/**
 * Fetch data, or info on data, by id.
 * @param {String} id
 * @param {Boolean} csv
 */
async function fetchDataById(id, csv) {
  const params = `id: "${id}"`
  const fields = csv
    ? `datacsv
      datafilename`
    : `datafile {
        name
        url
      }`
  const query = buildQuery('dataset', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.dataset : null,
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
      agegroup
      unit
      variables
      description
      notes
      citation
      funding
      datacsv
      # datafile {
      #  name
      #  url
      # }
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
