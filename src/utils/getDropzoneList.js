export default refs => ({
  // common (post)
  ...getDz(refs.DropzoneJson, 'json'),

  // apps
  ...getDz(refs.DropzoneImage, 'image'),

  // articles
  ...getDz(refs.DropzoneExtrafile, 'extrafile'),
  ...getDz(refs.DropzoneImages, 'images'),
  ...getDz(refs.DropzoneMainfile, 'mainfile'),
  ...getDz(refs.DropzoneMarkdown, 'markdown'),
  ...getDz(refs.DropzoneSplash, 'splash'),

  // datasets
  ...getDz(refs.DropzoneDatafile, 'datafile')
})

const getDz = (dz, field) => (dz ? { [field]: dz.$refs.MyDropzone } : {})
