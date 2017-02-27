import { Mongo } from 'meteor/mongo';
// import { Class } from 'meteor/jagi:astronomy';

export const UserFamily = new Mongo.Collection('user_families');
/*
const BmiData = Class.create({
  name: 'BmiData',
  fields: {
    height: Number,
    weight: Number,
    publishedAt: Date,
  },
});

export const UserFamily = Class.create({
  name: 'UserFamily',
  collection: UserFamilies,
  secured: true,
  fields: {
    userId: String,
    name: String,
    sex: String,
    birthDate: Date,
    bmiData: [BmiData],
    publishedAt: Date,
  },
});
*/
