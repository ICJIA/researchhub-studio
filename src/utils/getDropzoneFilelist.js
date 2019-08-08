export default dropzoneList =>
  Object.keys(dropzoneList)
    .filter(field => field.includes('file'))
    .reduce((arr, field) => [...arr, ...getFile(dropzoneList, field)], [])

const getFile = (dropzoneList, field) => {
  const files = dropzoneList[field].getAcceptedFiles()
  return files.length ? [{ field, file: files[0] }] : []
}
