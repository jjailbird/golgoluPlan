import fs from 'fs';

// function to encode file data to base64 encoded string
export default function getBase64Encode(filePath) {
    // read binary data
  const bitmap = fs.readFileSync(filePath);
    // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}
