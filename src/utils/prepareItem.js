export default content => ({
  // common
  ...content,
  ...prepareBase(content),

  // articles
  ...getAuthorString(content),

  // datasets
  ...getNoteString(content),
  ...getSourceStrings(content),
  ...getTimeperiodStrings(content),
  ...getVariableSTring(content)
})

const prepareBase = ({ date, tags }) => ({
  date: date.slice(0, 10),
  tagString: tags ? tags.join(', ') : ''
})

const getAuthorString = ({ authors }) =>
  authors
    ? {
        authorString: authors
          .map(el => `${el.title} | ${el.description}`)
          .join('\n')
      }
    : {}

const getTimeperiodStrings = ({ timeperiod }) =>
  timeperiod
    ? {
        timeperiodString: `${timeperiod.yearmin}-${timeperiod.yearmax}`,
        timeperiodType: timeperiod.yeartype
      }
    : {}

const getSourceStrings = ({ sources }) =>
  sources
    ? {
        sourceTitleString: sources.map(el => el.title).join(', '),
        sourceUrlString: sources.map(el => el.url).join(', ')
      }
    : {}

const getNoteString = ({ notes }) =>
  notes ? { noteString: notes.join('\n') } : {}

const getVariableSTring = ({ variables }) =>
  variables
    ? {
        variableString: variables
          .map(
            el => `${el.name} | ${el.type} | ${el.definition} | ${el.values}`
          )
          .join('\n')
      }
    : {}
