import { fetchData, buildQuery } from './client'

export { fetchItemById, fetchItemsList }

const fields = `
  _id
  title
  slug`

async function fetchItemById(id) {
  const params = `id: "${id}"`
  const query = buildQuery('author', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.author : {},
    status: HTTPstatus
  }
}

async function fetchItemsList() {
  const params = `sort: "title"`
  const query = buildQuery('authors', params, fields)
  const [data, HTTPstatus] = await fetchData(query)
  return {
    data: data ? data.authors : [],
    status: HTTPstatus
  }
}
