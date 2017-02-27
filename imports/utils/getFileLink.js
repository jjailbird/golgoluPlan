// ref: https://github.com/VeliovGroup/Meteor-Files/blob/master/files.coffee

export default function getFileLink(rootUrl, fileRef, version = 'original') {
  const root = rootUrl; // __meteor_runtime_config__.ROOT_URL.replace(/\/+$/, '');
  const ext = fileRef.extension ? `.${fileRef.extension}` : '';
  let formatFleURL = '';
  if (fileRef.public) {
    if (version === 'original') {
      formatFleURL = `${root}${fileRef._downloadRoute}/${fileRef._id}${ext}`;
    } else {
      formatFleURL = `${root}/${fileRef._downloadRoute}/${version}-${fileRef._id}${ext}`;
    }
  } else {
    formatFleURL = `${root}${fileRef._downloadRoute}/${fileRef._collectionName}/${fileRef._id}/${version}/${fileRef._id}${ext}`;
  }
  return formatFleURL;
}
