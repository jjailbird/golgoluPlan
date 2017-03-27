/* eslint-disable prefer-arrow-callback, func-names, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { FoodOpenData } from '../../collections/FoodOpenData.js';

if (Meteor.isServer) {
  // arrow function does not bind its own this, arguments, super, or new.target.
  // ref: http://stackoverflow.com/questions/27991128/this-userid-returns-undefined-inside-meteor-publish
  // FoodOpenData._ensureIndex({ DESC_KOR: 'text' });
  Meteor.publish('food_open_data.all', function () { return FoodOpenData.find(); });
  Meteor.publish('fooddata.paging', (query) => {
    check(query, {
      limit: Match.OneOf(String, Number),
      skip: Match.OneOf(String, Number),
      search: String,
    });
    // check(skip, Number);
    const searchText = query.search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'); // query.search;
    const find = (searchText === '') ? {} : { DESC_KOR: { $regex: `${searchText}` } };
    // { $text: { $search: searchText } };
    // console.log(find);
    return FoodOpenData.find(find, {
      limit: parseInt(query.limit),
      skip: parseInt(query.skip),
      sort: { NUM: 1 },
    });
  });
  Meteor.publish('fooddata.count', function (search) {
    check(search, String);
    const searchText = search.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&'); // search;
    const find = (searchText === '') ? {} : { DESC_KOR: { $regex: `${searchText}` } };
    // const find = (search === '') ? {} : { $text: { $search: searchText } };
    return new Counter('fooddata-total', FoodOpenData.find(find));
    // return new Counter('fooddata-total', FoodData.find(search));
  });
}
