import { fetchQueryResult } from './client.utils'

export { fetchItemsList }

const tagsQuery = `{
  apps (where: { status: "published" }) { tags }
  articles (where: { status: "published" }) { tags }
  datasets (where: { status: "published" }) { tags }
}`

/**
 * Fetch a list of unique tags in published items.
 */
const fetchItemsList = async () =>
  useTagsList(await fetchQueryResult()(tagsQuery))

/**
 * Use tags list for data.
 * @param {Object} args
 * @param {Object} args.data
 * @param {Number} args.status
 */
const useTagsList = ({ data, status }) => ({ data: getTagsList(data), status })

/**
 * Get a list of unique tags from published items.
 * @param {Object} args
 * @param {[Object]} args.apps
 * @param {[Object]} args.articles
 * @param {[Object]} args.datasets
 */
const getTagsList = ({ apps, articles, datasets }) => [
  ...new Set([
    ...getFieldSet('tags')(apps),
    ...getFieldSet('tags')(articles),
    ...getFieldSet('tags')(datasets)
  ])
]

/**
 * Get a list of unique tags from published items.
 * @param {String} field
 * @param {[Object]} items
 */
const getFieldSet = field => items => new Set(items.map(el => el[field]).flat())
