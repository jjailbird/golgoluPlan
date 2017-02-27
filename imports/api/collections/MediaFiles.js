/* eslint-disable
  prefer-arrow-callback, func-names, no-underscore-dangle, no-else-return, no-undef */
// import { Mongo } from 'meteor/mongo';

export const MediaFiles = new FilesCollection({
  debug: false,
  collectionName: 'MediaFiles',
  // schema: new SimpleSchema(defaultSchema),
  // permissions: 777,
  // parentDirPermissions: 777,
  // public: true,
  // downloadRoute: '/uploads/',
  storagePath: '/data/golgoruPlan/uploads/',
  allowClientCode: true, // Disallow remove files from client
  onBeforeUpload(file) {
    // Allow upload files under 100MB, and only in png/jpg/jpeg formats
    if (file.size <= 104857600 && /png|jpg|jpeg|mp4/i.test(file.extension)) {
      return true;
    } else {
      alert('Please upload image, video, with size equal or less than 10MB');
      return false;
    }
  },
  onAfterUpload(file) {
    // const self = this;
    MediaFiles.update(file._id, {
      $set: {
        updatedAt: new Date(),
        category: file.meta.category,
        userId: file.meta.userId,
      },
    });
  },
});
