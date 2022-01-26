const { storageBucket } = require("../config/firebase");

exports.uploadImage = (ref, filename, file) => {
  var upload_loc = ref.toString() + '/' + filename;
  // var upload_ref = storageBucket.(upload_loc);
  storageBucket.put(file).then(
    (snapshot) => {
      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        return downloadURL;
      });
    },
    (error) => {
      console.log('FirebaseManager, upload_image(): ' + error);
      throw error;
    },
  );

  return 'error';
};
