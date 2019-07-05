import { fetchData, buildQuery } from './client'

export { fetchItemById, fetchItemsList }

/**
 * Fetch an article using id.
 * @param {String} id
 */
async function fetchItemById(id) {
  const params = `id: "${id}"`
  const fields = getArticleFields(false)
  const query = buildQuery('article', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.article : null,
    status: HTTPstatus
  }
}

/**
 * Fetch a list of articles of status.
 * @param {String} status
 */
async function fetchItemsList(status) {
  const params = `sort: "date:desc", where: { status: "${status}" }`
  const fields = getArticleFields(true)
  const query = buildQuery('articles', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.articles : null,
    status: HTTPstatus
  }
}

/**
 * Get article fields for building a query string.
 * @param {Boolean} isList
 */
function getArticleFields(isList) {
  let fields = `
    _id
    title
    slug
    date`

  if (!isList) {
    fields = `
      ${fields}
      external
      type
      categories
      tags
      splash
      thumbnail
      abstract
      images
      markdown
      citation
      doi
      funding
      apps (sort: "date:desc", where: { status: "published" }) {
        _id
        title
        slug
      }
      authors {
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
