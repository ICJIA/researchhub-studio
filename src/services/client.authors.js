import { fetchData, buildQuery } from './client'

export { fetchItemsList }

async function fetchItemsList() {
  const params = `sort: "title"`
  const fields = `
    _id
    title
    slug`
  const query = buildQuery('authors', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.authors : null,
    status: HTTPstatus
  }
}
