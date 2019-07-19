import { fetchData } from './client'

export { fetchItemsList }

/**
 * Fetch a list of unique tags in published items.
 */
async function fetchItemsList() {
  const query = `
    {
      apps (where: { status: "published" }) {
        tags
      }
      articles (where: { status: "published" }) {
        tags
      }
      datasets (where: { status: "published" }) {
        tags
      }
    }`
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? getTagsList(data) : [],
    status: HTTPstatus
  }
}

/**
 * Get a list of unique tags from published items.
 * @param {Object} data
 */
function getTagsList(data) {
  const getTagsSet = items => new Set(items.map(el => el.tags).flat())
  return [
    ...new Set([
      ...getTagsSet(data.apps),
      ...getTagsSet(data.articles),
      ...getTagsSet(data.datasets)
    ])
  ]
}
