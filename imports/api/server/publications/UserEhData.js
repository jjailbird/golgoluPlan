/* eslint-disable prefer-arrow-callback, func-names, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { UserEhData } from '../../collections/UserEhData.js';

if (Meteor.isServer) {
  // arrow function does not bind its own this, arguments, super, or new.target.
  // ref: http://stackoverflow.com/questions/27991128/this-userid-returns-undefined-inside-meteor-publish
  Meteor.publish('userfamilies.private', function () {
    return UserEhData.find({ userId: this.userId });
  });
  Meteor.methods({
    'UserEhData.insertNew'(data) {
      check(data, Object);
      const findKey = {
        userId: data.userId,
        familyId: data.familyId,
      };
      const existEhData = UserEhData.findOne(findKey);
      const inputData = {};
      if (!existEhData) {
        inputData.userId = data.userId;
        inputData.familyId = data.familyId;
        inputData.answers = [{
          group_no: data.group_no,
          group_answers: new Array(data.group_length),
        }];
      }
      /*
      if (existEhData) {
        UserEhData.update(findKey, {
          $set: {
            birthDate: data.birthDate,
            sex: data.sex,
          },
        });
        const findElem = {
          bmiData: { $elemMatch: { publishedAt: data.bmiData[0].publishedAt } },
        };
        const existBmi = UserEhData.findOne(
          Object.assign({}, findKey, findElem)
        );
        if (existBmi) {
          const findBmi = {
            'bmiData.publishedAt': data.bmiData[0].publishedAt,
          };
          UserEhData.update(Object.assign({}, findKey, findBmi), {
            $set: {
              'bmiData.$.height': data.bmiData[0].height,
              'bmiData.$.weight': data.bmiData[0].weight,
            },
          });
        } else {
          UserEhData.update(findKey, {
            $push: { bmiData: data.bmiData[0] },
          });
        }
        return { execute: 'update', id: existEhData._id };
      }
      return { execute: 'insert', id: UserEhData.insert(data) };
      */
    },
  });
  /*
  UserFamily.extend({
    meteorMethods: {
      insertFirst(data) {
        this.userId = data.userId;
        this.name = data.name;
        this.sex = data.sex;
        this.birthDate = data.birthDate;
        this.bmiData = [{
          publishedAt: new Date(),
          height: parseFloat(data.height),
          weight: parseFloat(data.weight),
        }];
        this.publishedAt = new Date();
        this.save();
      },
    },
  });
  */
}
