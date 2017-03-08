/* eslint-disable prefer-arrow-callback, func-names, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { UserEhData } from '../../collections/UserEhData.js';

if (Meteor.isServer) {
  // arrow function does not bind its own this, arguments, super, or new.target.
  // ref: http://stackoverflow.com/questions/27991128/this-userid-returns-undefined-inside-meteor-publish
  Meteor.publish('userehdata.private', function () {
    return UserEhData.find({ userId: this.userId });
  });
  Meteor.methods({
    'UserEhData.insert'(data) {
      check(data, Object);
      const findKey = {
        userId: data.userId,
        familyId: data.familyId,
      };
      const existEhData = UserEhData.findOne(findKey);
      if (!existEhData) {
        UserEhData.insert(data);
      } else {
        UserEhData.update(findKey, {
          $set: {
            ehDataUserAnswers: data.ehDataUserAnswers,
            ehDataUserPoints: data.ehDataUserPoints,
          },
        });
      }
    },
  });
}
