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
          isPassive: false,
          active: true,
        };
        console.log('Reading /invites');
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
    auth.signInWithEmailAndPassword(email, password).then((user) => {
      getDocument('/users', user.uid, false)
        .then((userData) => resolve(userData))
        .catch((error) => reject(error));
    });
  });
};

export const checkIfEmailIsInvited = (email) => {
  return getDocument('invites', email, false);
};

export const getStudyLines = () => {
  return getCollection('/studylines', false);
};

export const getUser = (id) => {
  return new Promise((resolve, reject) => {
    getDocument('/users', id, false)
      .then((user) => {
        getDocument('/studylines', user.studyline, false)
          .then((studyline) => {
            resolve({ ...user, studyline: studyline });
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

export const getActiveTenders = () => {
  return new Promise((resolve, reject) => {
    getUsers()
      .then((users) => {
        resolve(
          users
            .filter((user) => !user.roles.includes('passive'))
            .map((user) => {
              return {
                displayName: user.displayName,
                studyline: user.studyline,
                photoUrl: user.photoUrl,
              };
            })
        );
      })
      .catch(reject);
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    getCollection('/studylines', false)
      .then((studylines) => {
        getCollection('/users', false)
          .then((users) => {
            resolve(
              users.map((user) => {
                return {
                  ...user,
                  studyline: studylines.filter(
                    (studyline) => studyline.id === user.studyline
                  )[0],
                };
              })
            );
          })
          .catch(reject);
      })
      .catch(reject);
  });
};

export const getInvitedUsers = () => {
  return getCollection('/invites', false);
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
