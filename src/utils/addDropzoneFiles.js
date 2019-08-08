export default async dropzoneList => ({
  // common (post)
  ...(await getJSON(dropzoneList)),

  // apps
  ...getImage(dropzoneList),

  // articles
  ...getImages(dropzoneList),
  ...(await getMarkdown(dropzoneList)),
  ...(await getSplash(dropzoneList))
})

const getImage = ({ image }) => {
  if (!image) return {}
  const files = image.getAcceptedFiles()
  return files.length ? { image: files[0].dataURL } : {}
}

const getImages = ({ images }) => {
  if (!images) return {}
  const files = images.getAcceptedFiles()
  return files.length
    ? {
        images: files.map(file => ({
          title: removeExt(file.name),
          src: file.dataURL
        }))
      }
    : {}
}

const removeExt = str =>
  str
    .split('.')
    .slice(0, -1)
    .join('.')

const getMarkdown = async ({ markdown }) => {
  if (!markdown) return {}
  const files = markdown.getAcceptedFiles()
  return files.length ? { markdown: await readFileAsync(files[0]) } : {}
}

const getSplash = async ({ splash }) => {
  if (!splash) return {}
  const files = splash.getAcceptedFiles()
  return files.length
    ? {
        splash: files[0].dataURL,
        thumbnail: await createThumbnail(files[0].dataURL, 240)
      }
    : {}
}

const getJSON = async ({ json }) => {
  if (!json) return {}
  const files = json.getAcceptedFiles()
  return files.length ? JSON.parse(await readFileAsync(files[0])) : {}
}
const calculateBase64Size = input => Math.round(new Blob([input]).size / 1024)

const createThumbnail = (input, targetSize) => {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img')

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

      resolve(canvas.toDataURL('image/jpeg', compress))
    }
    img.onerror = reject
    img.src = input
  })
}

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsText(file)
  })
}
