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
    data: data ? data.article : {},
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
    data: data ? data.articles : [],
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
      categories
      tags
      splash
      thumbnail
      abstract
      authors
      images
      markdown
      citation
      doi
      funding
      mainfiletype
      mainfile {
        name
        url
      }
      extrafile {
        name
        url
      }
      apps (sort: "date:desc", where: { status: "published" }) {
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
