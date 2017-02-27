/* eslint-disable prefer-arrow-callback, func-names, no-underscore-dangle */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { MediaFiles } from '../../collections/MediaFiles.js';

if (Meteor.isServer) {
  // MediaFiles.denyClient();
  MediaFiles.allowClient();
  // MediaFiles.collection.attachSchema(defaultSchema);
  Meteor.publish('MediaFiles.all', () => MediaFiles.find().cursor);
  Meteor.publish('MediaFiles.private', function () {
    // console.log('MediaFiles.userId', this.userId);
    return MediaFiles.find({ userId: this.userId }).cursor;
  });
  Meteor.methods({
    'Files.Remove'(fileid) {
      check(fileid, String);
      MediaFiles.remove({ _id: fileid });
    },
    'Files.RemoveAll'(fileIds) {
      // console.log('fileIds', fileIds);
      check(fileIds, Array);
      MediaFiles.remove({ _id: { $in: fileIds } });
    },
    'Categories.RemoveAll'(catIds) {
      check(catIds, Array);
      MediaFiles.remove({ _id: { $in: catIds } });
      MediaFiles.remove({ catId: { $in: catIds } });
    },
    'Files.Rename'(fileid, filename) {
      check(fileid, String);
      check(filename, String);
      MediaFiles.update({ _id: fileid }, { $set: { name: filename } });
    },
  });
} else {
  Meteor.subscribe('MediaFiles.all');
}
