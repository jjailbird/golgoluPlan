/* eslint-disable prefer-arrow-callback, func-names, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { UserFoodLog } from '../../collections/UserFoodLog.js';

if (Meteor.isServer) {
  // arrow function does not bind its own this, arguments, super, or new.target.
  // ref: http://stackoverflow.com/questions/27991128/this-userid-returns-undefined-inside-meteor-publish
  Meteor.publish('UserFoodLog.private', function () {
    return UserFoodLog.find({ userId: this.userId });
  });
  Meteor.publish('UserFoodLog.private.family', function (familyId) {
    check(familyId, String);
    return UserFoodLog.find({ userId: this.userId, familyId });
  });
  Meteor.publish('UserFoodLog.private.family.mealType', function (familyId, mealType) {
    check(familyId, String);
    check(mealType, String);
    return UserFoodLog.find({ userId: this.userId, familyId, mealType });
  });
  Meteor.methods({
    'UserFoodLog.insert'(data) {
      check(data, Object);
      const logData = {
        userId: data.userId,
        familyId: data.familyId,
        mealDate: data.mealDate,
        mealType: data.mealType,
        meal: data.meal,
        intake: data.intake,
      };
      UserFoodLog.insert(logData);
    },
    'UserFoodLog.Remove'(foodId) {
      check(foodId, String);
      UserFoodLog.remove({ _id: foodId });
    },
  });
}
