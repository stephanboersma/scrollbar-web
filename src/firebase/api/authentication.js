import { auth, db, storage } from '..';
import { getCollection, getDocument, getExtension } from './common';

export const createAccount = (form) => {
  return new Promise((resolve, reject) => {
    auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(async (user) => {
        const userData = {
          displayName: `${form.firstname} ${form.surname}`,
          email: form.email,
          studyline: form.studyline,
          isAdmin: false,
          roles: ['regular_access', 'tender'],
          phone: null,
          active: true,
          photoUrl: '',
        };
        await db
          .collection('/invites')
          .doc(form.email)
          .update({ registered: true });
        saveUser(user.user.uid, userData)
          .then(() => resolve(userData))
          .catch(reject);
      })
      .catch(reject);
  });
};

export const loginWithEmailAndPassword = (email, password) => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        getDocument('/users', user.uid, false)
          .then((userData) => resolve(userData))
          .catch((error) => reject(error));
      })
      .catch(reject);
  });
};

export const checkIfEmailIsInvited = (email) => {
  return getDocument('invites', email, false);
};

export const getStudyLines = () => {
  return getCollection('/studylines', false);
};

export const getUser = (id, observer) => {
  return db.collection('/users').doc(id).onSnapshot(observer);
};

export const streamUsers = (observer) => {
  return db.collection('/users').onSnapshot(observer);
};

export const streamInvitedUsers = (observer) => {
  return db.collection('/invites').onSnapshot(observer);
};

export const inviteUser = (email) => {
  return db.collection('/invites').doc(email).set({ registered: false });
};

export const deleteInvite = ({ id }) => {
  return db.collection('/invites').doc(id).delete();
};

export const updateUser = ({ id, field, value }) => {
  return db
    .collection('/users')
    .doc(id)
    .update({ [field]: value });
};

export const uploadProfilePicture = (picture, email) => {
  return storage
    .ref(`profile_pictures/${email}.${getExtension(picture.name)}`)
    .put(picture, {
      contentType: picture.type,
      customMetadata: { uploadedBy: email },
    })
    .then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    });
};

const saveUser = (id, profile) => {
  return db.collection('/users').doc(id).set(profile);
};
export const signOut = () => auth.signOut();

export const streamSettings = (observer) => {
  return db.collection('/settings').doc('settings').onSnapshot(observer);
};
