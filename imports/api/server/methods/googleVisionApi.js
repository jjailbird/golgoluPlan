import { Meteor } from 'meteor/meteor';
import vision from '@google-cloud/vision';

const GOOGLE_API_KEY = 'AIzaSyCXno6KLmet-U9QDvsY730kJBsUNVibS3I';
const GOOGLE_KEY_PATH = Assets.absoluteFilePath('google.api/golgoruPlan-59d013afd258.json');

const visionClient = vision({
  projectId: 'golgoruplan',
  keyFilename: GOOGLE_KEY_PATH,
});

console.log('GOOGLE_KEY_PATH', GOOGLE_KEY_PATH);

if (Meteor.isServer) {
  Meteor.methods({
    'vision.detectLabels'(fileObj) {
      check(fileObj, Object);
      // let results = null;
      visionClient.detectLabels(fileObj.path).then(data => {
        const labels = data[0];
        const apiResponse = data[1];
        // results = labels;
        console.log('labels: ', labels);
        console.log('apiResponse: ', apiResponse);
        return labels;
      }, e => {
        // results = e;
        console.log('detectLables Error: ', e);
        return e;
      });
      // return results;
    },
  });
}
