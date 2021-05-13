import firebase from '../firebase';
export const convertToTimestamp = (date) =>
  firebase.firestore.Timestamp.fromDate(date);
