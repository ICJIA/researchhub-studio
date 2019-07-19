const addAppImage = (item, files) => {
  if (files.length) item.image = files[0].dataURL
}

const addArticleImages = (item, files) => {
  const removeExt = str =>
    str
      .split('.')
      .slice(0, -1)
      .join('.')

  if (files.length)
    item.images = files.map(file => ({
      title: removeExt(file.name),
      src: file.dataURL
    }))
}

const addArticleMarkdown = async (item, files) => {
  if (files.length) item.markdown = await readFileAsync(files[0])
}

const addArticleSplash = async (item, files) => {
  if (files.length) {
    const dataURL = files[0].dataURL

    item.splash = dataURL
    item.thumbnail = await createThumbnail(dataURL, 300)
  }
}

const addDropzoneFiles = async (
  item,
  contentType,
  dropzoneList,
  isPost = false
) => {
  const dz = dropzoneList
  if (isPost && dz.json) await addJSON(item, dz.json.getAcceptedFiles())

  switch (contentType) {
    case 'apps':
      if (dz.image) addAppImage(item, dz.image.getAcceptedFiles())
      break
    case 'articles':
      if (dz.splash) addArticleSplash(item, dz.splash.getAcceptedFiles())
      if (dz.images) addArticleImages(item, dz.images.getAcceptedFiles())
      if (isPost && dz.markdown)
        await addArticleMarkdown(dz.markdown.getAcceptedFiles())
  }
}

const addJSON = async (item, files) => {
  if (files.length)
    Object.assign(item, JSON.parse(await readFileAsync(files[0])))
}

const calculateBase64Size = input => Math.round(new Blob([input]).size / 1024)

const createThumbnail = (input, targetSize) => {
  return new Promise(async function(resolve, _) {
    // We create an image to receive the Data URI
    const img = document.createElement('img')

    // When the event "onload" is triggered we can resize the image.
    img.onload = function() {
      const size = calculateBase64Size(input)
      const compress = size < 50 ? null : 50 / size

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const refSize =
        this.naturalHeight < this.naturalWidth
          ? this.naturalHeight
          : this.naturalWidth

      canvas.height = targetSize
      canvas.width = targetSize

      ctx.drawImage(this, 0, 0, refSize, refSize, 0, 0, targetSize, targetSize)

      var dataURI = canvas.toDataURL('image/jpeg', compress)

      resolve(dataURI)
    }

    img.src = input
  })
}

const getDropzonelist = (contentType, refs, isPost = false) => {
  const getDropzone = dz => (dz ? dz.$refs.MyDropzone : null)
  const dropzoneList = {}

  switch (contentType) {
    case 'apps':
      dropzoneList.image = getDropzone(refs.DropzoneImage)
      break
    case 'articles':
      dropzoneList.mainfile = getDropzone(refs.DropzoneMainfile)
      dropzoneList.extrafile = getDropzone(refs.DropzoneExtrafile)
      dropzoneList.splash = getDropzone(refs.DropzoneSplash)
      dropzoneList.images = getDropzone(refs.DropzoneImages)
      if (isPost) dropzoneList.markdown = getDropzone(refs.DropzoneMarkdown)
      break
    case 'datasets':
      dropzoneList.datafile = getDropzone(refs.DropzoneDatafile)
  }

  if (isPost) dropzoneList.json = getDropzone(refs.DropzoneJson)

  return dropzoneList
}

const getDropzoneFilelist = dropzoneList => {
  const getFile = (dz, field) => {
    const files = dz[field].getAcceptedFiles()
    if (files.length) return files[0]
  }

  return Object.keys(dropzoneList)
    .filter(field => field.includes('file'))
    .map(field => ({ field, file: getFile(dropzoneList, field) }))
    .filter(el => el.file)
}

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsText(file)
  })
}

const removeDropzoneFiles = dropzoneList => {
  Object.keys(dropzoneList)
    .filter(k => dropzoneList[k])
    .forEach(k => dropzoneList[k].removeAllFiles())
}

export { removeDropzoneFiles }

export default {
  data() {
    return {
      dropzoneMsgCsv: 'Drop a CSV file here to upload',
      dropzoneMsgFile: 'Drop a file here to upload',
      dropzoneMsgImage: 'Drop an image (JPEG or PNG only) here to upload',
      dropzoneMsgImages: 'Drop images (JPEG or PNG only) here to upload',
      dropzoneMsgJson: 'Drop a JSON file here to upload',
      dropzoneMsgMarkdown: 'Drop a markdown file here to upload',
      dropzoneMsgPDF: 'Drop a PDF file here to upload'
    }
  },
  methods: {
    addDropzoneFiles,
    getDropzonelist,
    getDropzoneFilelist,
    removeDropzoneFiles
  }
}
