const hasAcceptedFiles = dz => {
  return dz.getAcceptedFiles().length > 0
}

const readFileAsync = file => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()

    reader.onload = () => resolve(reader.result)
    reader.onerror = reject

    reader.readAsText(file)
  })
}

const calculateBase64Size = input => {
  return Math.round(new Blob([input]).size / 1024)
}

const createThumbnail = (input, targetSize) => {
  return new Promise(async function(resolve, reject) {
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

export default {
  data() {
    return {
      msgDropzoneCsv: 'Drop a CSV file here to upload',
      msgDropzoneImage: 'Drop an image (JPEG or PNG only) here to upload',
      msgDropzoneImages: 'Drop images (JPEG or PNG only) here to upload',
      msgDropzoneJson: 'Drop a JSON file here to upload',
      msgDropzoneMarkdown: 'Drop a markdown file here to upload'
    }
  },
  methods: {
    async addDropzoneFiles(item, contentType, dropzoneList) {
      const _ = dropzoneList

      if (contentType === 'apps') {
        if (hasAcceptedFiles(_.image)) {
          item.image = _.image.getAcceptedFiles()[0].dataURL
        }
      } else if (contentType === 'articles') {
        if (hasAcceptedFiles(_.splash)) {
          const dataURL = _.splash.getAcceptedFiles()[0].dataURL

          item.splash = dataURL
          item.thumbnail = await createThumbnail(dataURL, 300)
        }

        if (hasAcceptedFiles(_.images)) {
          item.images = _.images.getAcceptedFiles().map(file => {
            return {
              title: file.name
                .split('.')
                .slice(0, -1)
                .join('.'),
              src: file.dataURL
            }
          })
        }
      } else if (contentType === 'datasets') {
        const datafile = _.data.getAcceptedFiles()[0]

        if (hasAcceptedFiles(_.data)) {
          item.datafilename = datafile.name
            .split('.')
            .slice(0, -1)
            .join('.')
          item.datacsv = await readFileAsync(datafile)
        }
      }

      if (this.$options.name === 'postform') {
        if (hasAcceptedFiles(_.json)) {
          const json = await readFileAsync(_.json.getAcceptedFiles()[0])
          Object.assign(item, JSON.parse(json))
        }

        if (contentType === 'articles' && hasAcceptedFiles(_.markdown)) {
          item.markdown = await readFileAsync(_.markdown.getAcceptedFiles()[0])
        }
      }
    },
    removeDropzoneFiles(dropzoneList) {
      Object.keys(dropzoneList).forEach(k => {
        if (dropzoneList[k]) dropzoneList[k].removeAllFiles()
      })
    }
  }
}
