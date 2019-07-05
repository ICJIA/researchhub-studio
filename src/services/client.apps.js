import { fetchData, buildQuery } from './client'

export { fetchItemById, fetchItemsList }

/**
 * Fetch an app using id.
 * @param {String} id
 */
async function fetchItemById(id) {
  const params = `id: "${id}"`
  const fields = getAppFields(false)
  const query = buildQuery('app', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.app : null,
    status: HTTPstatus
  }
}

/**
 * Fetch a list of apps of status.
 * @param {String} status
 */
async function fetchItemsList(status) {
  const params = `sort: "date:desc", where: { status: "${status}" }`
  const fields = getAppFields(true)
  const query = buildQuery('apps', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.apps : null,
    status: HTTPstatus
  }
}

/**
 * Get app fields for building a query string.
 * @param {Boolean} isList
 */
function getAppFields(isList) {
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
      image
      contributors
      description
      url
      citation
      funding
      articles (sort: "date:desc", where: { status: "published" }) {
        _id
        title
        slug
      }
      datasets (sort: "date:desc", where: { status: "published" }) {
        _id
        title
        slug
      }`
  }

  return fields
}
