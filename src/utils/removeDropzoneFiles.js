export default dropzoneList =>
  Object.keys(dropzoneList)
    .filter(k => dropzoneList[k])
    .forEach(k => dropzoneList[k].removeAllFiles())
