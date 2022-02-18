// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCTzf3bH61AWN-Y9YV8gA_IcKKHJDaz4i4',
  authDomain: 'sese-681d5.firebaseapp.com',
  projectId: 'sese-681d5',
  storageBucket: 'sese-681d5.appspot.com',
  messagingSenderId: '920078585236',
  appId: '1:920078585236:web:c436123373e843d1075381',
  measurementId: 'G-9JVDRK097X',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
