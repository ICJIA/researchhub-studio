import temporaryFields from '@/consts/temporaryFields'

export default item =>
  removeUnusedFields({
    // common
    ...item,
    ...parseTags(item),

    // articles
    ...parseAuthors(item),
    ...parseMarkdown(item),

    // datasets
    ...parseNotes(item),
    ...parseSources(item),
    ...parseTimeperiod(item),
    ...parseVariables(item)
  })

const parseAuthors = ({ authorString }) =>
  authorString
    ? {
        authors: authorString.split(/[\r\n]+/).map(author => {
          const [title, description] = author.split('|').map(el => el.trim())
          return { title, description }
        })
      }
    : {}

const parseMarkdown = ({ markdown }) => (markdown ? { markdown } : {})

const parseNotes = ({ noteString }) =>
  noteString
    ? {
        notes: noteString
          .split(/[\r\n]+/)
          .map(el => el.trim())
          .filter(el => el)
      }
    : {}

const parseSources = ({ sourceTitleString, sourceUrlString }) =>
  sourceTitleString
    ? {
        sources: strToArr(sourceTitleString).map((title, i) => ({
          title,
          url: strToArr(sourceUrlString)[i]
        }))
      }
    : {}

const parseTags = ({ tagString }) =>
  tagString ? { tags: strToArr(tagString) } : {}

const parseTimeperiod = ({ timeperiodType, timeperiodString }) =>
  timeperiodString
    ? {
        timeperiod: {
          yeartype: timeperiodType,
          yearmin: timeperiodString.split('-')[0],
          yearmax: timeperiodString.split('-')[1]
        }
      }
    : {}

const parseVariables = ({ variableString }) =>
  variableString
    ? {
        variables: variableString.split(/[\r\n]+/).map(row => {
          const [name, type, definition, values] = strToArr(row, '|')
          return { name, type, definition, values }
        })
      }
    : {}

const strToArr = (str, sep = ',') => str.split(sep).map(el => el.trim())

const removeUnusedFields = item =>
  Object.keys(item)
    .filter(
      field =>
        !temporaryFields.includes(field) &&
        item[field] !== undefined &&
        item[field] !== null
    )
    .reduce(
      (obj, field) => ({ ...obj, [field]: removeUndefined(item[field]) }),
      {}
    )

const removeUndefined = field =>
  Array.isArray(field) ? field.filter(el => el !== undefined) : field
