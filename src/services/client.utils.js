import client from './client'

export {
  fetchData,
  fetchListByStatus,
  fetchOneById,
  fetchQueryResult,
  healthCheck
}

/**
 * @param {Object} args
 * @param {String} args.contentType
 * @param {String} args.id
 * @param {[String]} args.fields
 */
const fetchOneById = async ({ contentType, id, fields }) =>
  await fetchData(contentType)({ params: `id: "${id}"`, fields })

/**
 * @param {Object} args
 * @param {String} args.contentType
 * @param {String} args.status
 */
const fetchListByStatus = async ({ contentType, fields, status }) =>
  await fetchData(contentType)({
    params: `sort: "date:desc", where: { status: "${status}" }`,
    fields
  })

/**
 * Fetch data from API server
 * @param {String} contentType
 * @param {String} params String
 * @param {String} fields String
 */
const fetchData = contentType => async ({ params, fields }) =>
  await fetchQueryResult(contentType)(
    `{\n  ${contentType} (${params}) {    \n${fields.join('    \n')}\n  }\n}`
  )

/**
 * Fetch Graphql query results from API server.
 * @param {String} contentType
 * @param {String} query
 * @return {(query:String) => Promise<Object>}
 */
const fetchQueryResult = (contentType = '') => async query =>
  await client
    .post('/graphql', { query })
    .then(({ data, status }) => ({
      data: contentType ? data.data[contentType] : data.data,
      status
    }))
    .catch(err => console.error(err))

/**
 * Check API server health.
 */
const healthCheck = async (timeout = 2000) =>
  await client
    .head(`/`, { timeout })
    .then(res => res.status === 200)
    .catch(() => false)
