import { auth } from '../index';

export const createAccount = ({ email, password }) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

export const loginWithEmailAndPassword = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

export const signOut = () => auth.signOut();
