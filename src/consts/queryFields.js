export { baseFields, appFields, articleFields, datasetFields }

const baseFields = ['_id', 'title', 'slug', 'date']

const appFields = [
  ...baseFields,
  'external',
  'categories',
  'tags',
  'image',
  'contributors',
  'description',
  'url',
  'citation',
  'funding',
  'articles (sort: "date:desc", where: { status: "published" }) { _id title slug }',
  'datasets (sort: "date:desc", where: { status: "published" }) { _id title slug }'
]

const articleFields = [
  ...baseFields,
  'external',
  'categories',
  'tags',
  'splash',
  'thumbnail',
  'abstract',
  'authors',
  'images',
  'markdown',
  'citation',
  'doi',
  'funding',
  'mainfiletype',
  'mainfile { name url }',
  'extrafile { name url }',
  'apps (sort: "date:desc", where: { status: "published" }) { _id title slug }',
  'datasets (sort: "date:desc", where: { status: "published" }) { _id title slug }'
]

const datasetFields = [
  ...baseFields,
  'external',
  'categories',
  'tags',
  'sources',
  'timeperiod',
  'unit',
  'variables',
  'description',
  'notes',
  'citation',
  'funding',
  'datafile { name url }',
  'apps (sort: "date:desc", where: { status: "published" }) { _id title slug } ',
  'articles (sort: "date:desc", where: { status: "published" }) { _id title slug } '
]
