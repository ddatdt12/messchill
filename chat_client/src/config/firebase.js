// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyBSB737XXE7c1ZB_ljaxuQMlGXbA7n0HmU',
//   authDomain: 'messchill-33f2b.firebaseapp.com',
//   projectId: 'messchill-33f2b',
//   storageBucket: 'messchill-33f2b.appspot.com',
//   messagingSenderId: '416127210499',
//   appId: '1:416127210499:web:8d1c1bf14e547a7b9d2a36',
// };

//Test
const firebaseConfig = {
  apiKey: 'AIzaSyDpO1a16rja5RKK1wVA-4cuHJ6QcVTjppQ',
  authDomain: 'weather-tracking-85ad9.firebaseapp.com',
  projectId: 'weather-tracking-85ad9',
  storageBucket: 'weather-tracking-85ad9.appspot.com',
  messagingSenderId: '477533455223',
  appId: '1:477533455223:web:2b7640613db926f3231772',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
