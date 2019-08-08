import { fetchQueryResult } from './client.utils'

export { fetchItemsList }

const authorQuery = `{ articles (where: { status: "published" }) { authors } }`
/**
 * Fetch a list of unique tags in published items.
 */
const fetchItemsList = async () =>
  useAuthorsList(await fetchQueryResult()(authorQuery))

/**
 * Use tags list for data.
 * @param {Object} args
 * @param {Object} args.data
 * @param {Number} args.status
 */
const useAuthorsList = ({ data, status }) => ({
  data: getAuthorsList(data),
  status
})

/**
 * Get a list of unique tags from published items.
 * @param {Object} args
 * @param {[Object]} args.articles
 */
const getAuthorsList = ({ articles }) => [
  ...new Set(
    articles.map(article => article.authors.map(author => author.title)).flat()
  )
]
