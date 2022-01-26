const admin = require('firebase-admin');

const serviceAccount = require('./messchill-33f2b-firebase-adminsdk-kdmty-bfe9a43df8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://messchill-33f2b.appspot.com',
});
module.exports = {
  firebaseAuth: admin.auth(),
  storageBucket: admin.storage().bucket(),
};

