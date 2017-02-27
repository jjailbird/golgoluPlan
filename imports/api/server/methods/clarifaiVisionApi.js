import { Meteor } from 'meteor/meteor';
import Clarifai from 'clarifai';
import getFileLink from '../../../utils/getFileLink';
import getBase64Encode from '../../../utils/getBase64Encode';

// instantiate a new Clarifai app passing in your clientId and clientSecret
const vision = new Clarifai.App(
  'lgaUDOFyiKatqRa-4C9UgWtFb4GvmOIYDqnCxkYF',
  'nuKOoshKMcpslH_tX_5fLCyl0DjXYVDjwIZPMEaU'
);

if (Meteor.isServer) {
  Meteor.methods({
    'vision.predict'(filePath) {
      check(filePath, String);
      // let results = null;
      vision.models.predict(Clarifai.FOOD_MODEL, { base64: getBase64Encode(filePath) }).then(
        (response) => {
          console.log('response', response.outpts.data.concepts.stringify());
        },
        (err) => {
          console.error(err);
        }
      );      // return results;
    },
  });
}
