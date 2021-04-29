import firebase from 'firebase';

firebase.initializeApp({
  apiKey: String(process.env.REACT_APP_FIREBASE_API_KEY),
  authDomain: String(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
  databaseURL: String(process.env.REACT_APP_FIREBASE_DATABASE_URL),
  projectId: String(process.env.REACT_APP_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.REACT_APP_FIREBASE_API_ID),
});

export const db = firebase.firestore();

export const storage = firebase.storage();

export const auth = firebase.auth();

export default firebase;
